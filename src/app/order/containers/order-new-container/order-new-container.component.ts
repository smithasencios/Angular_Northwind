import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { CustomerPopupContainerComponent } from '../customer-popup-container/customer-popup-container.component';
import { Customer } from '../../models/customer';
import { OrderAddProductContainerComponent } from '../order-add-product-container/order-add-product-container.component';
import { Product } from '../../models/product';
import { PreOrderHeader } from '../../models/pre-order-header';
import { PreOrderFooter } from '../../models/pre-order-footer';

@Component({
  selector: 'app-order-new-container',
  templateUrl: './order-new-container.component.html',
  styleUrls: ['./order-new-container.component.scss']
})
export class OrderNewContainerComponent implements OnInit {

  newForm: FormGroup;

  productList: PreOrderHeader[] = [];
  preOrderFooter: PreOrderFooter = PreOrderFooter.createEmptyInstance();

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.buildNewForm();
  }

  ngOnInit() {

  }
  buildNewForm(): void {
    this.newForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      company: ['', [Validators.required]],
      fecha: [new Date(), [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
  }
  openCustomerPopup(): void {
    const dialogRef = this.dialog.open(CustomerPopupContainerComponent, {
      width: '40vw'
    });
    dialogRef.afterClosed().subscribe((response: Customer) => {
      if (response) {
        this.newForm.patchValue({
          id: [response.id],
          name: [response.name],
          company: [response.company],
          address: [response.address],
          phone: [response.business_phone],
          city: [response.city],
        });
      }
    });
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(OrderAddProductContainerComponent, {
      width: '40vw'
    });
    dialogRef.afterClosed().subscribe((response: Product) => {
      if (response) {
        this.AddProductToList(response);
      }
    });
  }

  AddProductToList(item: Product): void {
    const product = new PreOrderHeader(item.id, item.product_name, item.standard_cost);
    this.productList.push(product);
    this.productList = [...this.productList];

    this.preOrderFooter = new PreOrderFooter(this.productList);
  }
  UpdateQuantity(event: any): any {
    const updatedProduct = { ...this.productList[event.index] };
    updatedProduct.Quantity = Number(event.newValue);
    updatedProduct.Total_Value = Number((updatedProduct.Quantity * updatedProduct.Unit_Price).toFixed(2));

    this.productList[event.index] = updatedProduct;
    this.productList = [...this.productList];

    this.preOrderFooter = new PreOrderFooter(this.productList);
  }
  onSave() {

  }
}
