
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { catchError, map, merge, startWith, switchMap, of as observableOf } from 'rxjs';
import { LoaderService } from 'src/app/shared/loader.service';
import { HttpRequestModel, HttpResponseModel } from 'src/app/shared/models/httpRequest.mode';
import { Product } from 'src/app/shared/models/product.model';
import { NetworkService } from 'src/app/shared/services/network.service';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.sass']
})
export class AdminViewComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'category', 'description', 'image', 'price', 'rate', 'edit', 'delete'];
  data: any[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<Product>;

  constructor(private networkService: NetworkService, private dialog: MatDialog, public loaderService: LoaderService) { }

  getRequest(apiUrl: string): HttpRequestModel {
    return {
      apiPath: apiUrl,
      query: {
        page: this.paginator.pageIndex,
        itemsPerPage: 10,
        offset: this.paginator.pageIndex ? this.paginator.pageIndex + 10 - 1 : 0
      }
    }
  }

  ngAfterViewInit() {
    this.loadData()
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
          return data.body;
        }),
      )
      .subscribe(data => this.data = data);
  }

  onPage() {
    this.loadData()
  }

  getCategories() {
    return this.networkService.get<string[]>(this.getRequest('products/categories'))
  }

  addProduct() {
    this.getCategories().subscribe(categories => {
      const ref = this.dialog.open(AddProductComponent, {
        width: '50vw',
        data: {
          categories: categories
        }
      })
      ref.afterClosed().subscribe(product => {
        if (product) {
          const options: HttpRequestModel = {
            apiPath: 'products',
            body: product
          }
          this.networkService.post(options).subscribe(res => this.loadData())
        }
      })
    })

  }

  deleteProduct(row: Product) {
    const options: HttpRequestModel = {
      apiPath: 'products/:id',
      urlParam: { id: row.id },
    }
    this.loaderService.isLoading.next(true);
    const i = this.data.findIndex(res => res.id === row.id)
    this.networkService.delete(options).subscribe(res => {
      this.loaderService.isLoading.next(false);
      this.data.splice(i, 1)
      this.table?.renderRows()
    })
  }

  editProduct(row: Product) {
    const ref = this.dialog.open(AddProductComponent, {
      data: {
        product: row,
        isEdit: true
      }
    })
    ref.afterClosed().subscribe(product => {
      if (product) {
        const i = this.data.findIndex(res => res.id === product.id);
        this.data[i] = { ...this.data[i], ...product }
        this.table.renderRows()
      }
    })

  }
}

