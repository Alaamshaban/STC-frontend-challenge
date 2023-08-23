import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { catchError, map, merge, startWith, switchMap, of as observableOf, delay, debounceTime } from 'rxjs';
import { LoaderService } from 'src/app/shared/loader.service';
import { HttpRequestModel, HttpResponseModel } from 'src/app/shared/models/httpRequest.mode';
import { Product } from 'src/app/shared/models/product.model';
import { NetworkService } from 'src/app/shared/services/network.service';


@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class UserViewComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<Product>;

  displayedColumns: string[] = ['id', 'title', 'category', 'image', 'price', 'rate'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  data: Product[] = []
  categories!: string[]
  groupped: { [key: string]: MatTableDataSource<HttpResponseModel<Product[]>> } = {}

  resultsLength = 0;
  pageSize = 10
  expandedElement!: Product | null;

  constructor(private networkService: NetworkService, public loaderService: LoaderService) { }

  ngAfterViewInit() {
    this.loadData()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.loaderService.isLoading.next(true)
    observableOf(filterValue.trim().toLowerCase()).pipe(debounceTime(1000), delay(2000)).subscribe(res => {
      this.categories.forEach(cat=>{
        this.groupped[cat].filter = res;

      })
      this.loaderService.isLoading.next(false)
    })
  }

  getRequest(apiUrl: string): HttpRequestModel {
    return {
      apiPath: apiUrl,
      query: {
        page: this.paginator.pageIndex,
        itemsPerPage: this.pageSize,
        offset: this.paginator.pageIndex ? this.paginator.pageIndex + this.pageSize - 1 : 0
      }
    }
  }

  loadData() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loaderService.isLoading.next(true)
          return this.networkService.getPaginated<HttpResponseModel<Product[]>>(this.getRequest('products')).pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.loaderService.isLoading.next(false)

          if (data === null) {
            return [];
          }
          this.resultsLength = data.count;
          let group = data.body.reduce((r: any, a: any) => {
            r[a.category] = [...r[a.category] || [], a];
            return r;
          }, {});
          Object.keys(group).forEach(cat => {
            this.groupped[cat] = new MatTableDataSource(group[cat]);
            this.data = [...this.data, ...group[cat]]
          })
          console.log(this.data)
          return Object.keys(group);
        }),
      )
      .subscribe(data => this.categories = data
      );
  }

  onPage() {
    this.loadData()
  }
}
