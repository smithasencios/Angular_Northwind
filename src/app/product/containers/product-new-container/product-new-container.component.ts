import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { KeyValue } from '@angular/common';
import { Product } from '../../models/product';
import { Store } from '@ngrx/store';
import * as productActions from '../../state/actions/product.actions';
import * as fromReducer from '../../state/reducers';

@Component({
  selector: 'app-product-new-container',
  templateUrl: './product-new-container.component.html',
  styleUrls: ['./product-new-container.component.scss']
})
export class ProductNewContainerComponent implements OnInit {

  productForm: FormGroup;
  categories: KeyValue<string, string>[] = this.buildCategories();
  product: Product;

  constructor(private fb: FormBuilder, private store: Store<fromReducer.ProductState>) {
    this.buildProductForm();
  }

  ngOnInit() {
  }

  buildCategories(): any {
    return [
      { key: 'Baked Goods & Mixes', value: 'Baked Goods & Mixes' },
      { key: 'Beverages', value: 'Beverages' },
      { key: 'Candy', value: 'Candy' },
      { key: 'Canned Fruit & Vegetables', value: 'Canned Fruit & Vegetables' },
      { key: 'Canned Meat', value: 'Canned Meat' },
      { key: 'Cereal', value: 'Cereal' },
      { key: 'Chips, Snacks', value: 'Chips, Snacks' },
      { key: 'Condiments', value: 'Condiments' },
      { key: 'Grains', value: 'Grains' },
      { key: 'Oil', value: 'Oil' },
      { key: 'Pasta', value: 'Pasta' },
      { key: 'Sauces', value: 'Sauces' },
      { key: 'Soups', value: 'Soups' }
    ];
  }

  buildProductForm() {
    this.productForm = this.fb.group({
      product_code: ['', [Validators.required]],
      product_name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
      standard_cost: ['', [Validators.required]],
      list_price: ['', [Validators.required]]
    });
  }
  onAdd(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        const newProduct = { ...this.product, ...this.productForm.value };
        this.store.dispatch(new productActions.AddProduct(newProduct));
      }
    }
  }
  
}
