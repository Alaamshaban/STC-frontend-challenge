import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/shared/models/product.model';
import { NetworkService } from 'src/app/shared/services/network.service';
import { HttpRequestModel } from 'src/app/shared/models/httpRequest.mode';
import { LoaderService } from 'src/app/shared/loader.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.sass']
})
export class AddProductComponent implements OnInit {
  addProductForm!: FormGroup;
  categories!: string[]
  product!: Product;
  isEdit = false;

  constructor(public dialogRef: MatDialogRef<AddProductComponent>,
    private loaderService: LoaderService,
    private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private networkService: NetworkService) {
    this.categories = this.data.categories
    this.product = this.data.product
    this.isEdit = this.data.isEdit

  }

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      description: [null],
      price: [null, Validators.required],
      category: [null, Validators.required]
    })
    if (this.isEdit) {
      this.patchForm()
    }
  }

  patchForm() {
    this.addProductForm.patchValue({ ...this.product })
  }

  addProduct() {
    if (this.addProductForm.valid)
      this.dialogRef.close(this.addProductForm.value)
    else
      this.addProductForm.markAllAsTouched()
  }

  editProduct() {
    if (this.addProductForm.valid) {
      const options: HttpRequestModel = {
        apiPath: 'products/:id',
        urlParam: { id: this.product.id },
        body: this.addProductForm.value
      }
      this.loaderService.isLoading.next(true)
      this.dialogRef.close({...this.addProductForm.value,id:this.product.id});
      this.networkService.put(options).subscribe(res => {
        this.loaderService.isLoading.next(false)
      })
    } else {
      this.addProductForm.markAllAsTouched()
    }
  }
}
