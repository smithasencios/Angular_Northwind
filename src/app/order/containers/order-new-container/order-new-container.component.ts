import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { CustomerPopupContainerComponent } from '../customer-popup-container/customer-popup-container.component';
import { Customer } from '../../models/customer';
import { OrderAddProductContainerComponent } from '../order-add-product-container/order-add-product-container.component';
import { Product } from '../../models/product';
import { PreOrderProduct } from '../../models/pre-order-product';
import { PreOrderFooter } from '../../models/pre-order-footer';
import { PreOrderCustomer } from '../../models/pre-order-customer';
import { PreOrder, PreOrderDetail } from '../../models/pre-order';
import * as orderActions from '../../state/actions/order.actions';
import * as fromReducer from '../../state/reducers';
import { Store, ActionsSubject } from '@ngrx/store';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderListItem } from '../../models/order-list-item';
import { ofType } from '@ngrx/effects';
@Component({
  selector: 'app-order-new-container',
  templateUrl: './order-new-container.component.html',
  styleUrls: ['./order-new-container.component.scss']
})
export class OrderNewContainerComponent implements OnInit {

  orderId: number = 0;
  orderForm: FormGroup;
  preOrderCustomer: PreOrderCustomer;
  orderProductList: PreOrderProduct[] = [];
  preOrderFooter: PreOrderFooter = PreOrderFooter.createEmptyInstance();
  preOrder: PreOrder = PreOrder.createEmptyInstance();

  constructor(private fb: FormBuilder,
    private dialog: MatDialog,
    private store: Store<fromReducer.OrderState>,
    private route: ActivatedRoute,
    private actionsSubject$: ActionsSubject,
    private router: Router) {
    this.buildNewForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.store.dispatch(new orderActions.LoadOrderById(params.id));
        this.setOnSuccess();
      }
    });
  }
  setOnSuccess() {
    this.actionsSubject$
      .pipe(ofType(orderActions.OrderActionTypes.LoadOrderByIdComplete))
      .subscribe((response: any) => {
        this.buildEditForm(response.payload)
      });
  }

  buildNewForm(): void {
    this.orderForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      company: ['', [Validators.required]],
      fecha: [new Date(), [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
  }

  buildEditForm(orderItem: OrderListItem): void {
    // console.log(orderItem);
    this.orderId = orderItem.Order_Id;

    this.orderForm = this.fb.group({
      id: [orderItem.Customer_Id, [Validators.required]],
      name: [orderItem.Customer, [Validators.required]],
      company: [orderItem.Company, [Validators.required]],
      fecha: [new Date(orderItem.Order_Date), [Validators.required]],
      address: [orderItem.Address, [Validators.required]],
      phone: [orderItem.Phone, [Validators.required]],
      city: [orderItem.City, [Validators.required]],
    });

    const ordeDetailEdit = orderItem.Data.data;
    if (ordeDetailEdit) {
      for (let index = 0; index < ordeDetailEdit.length; index++) {
        const element = ordeDetailEdit[index];
        const product = new PreOrderProduct(element.Id, element.ProductId, element.ProductName, element.UnitPrice);
        this.orderProductList.push(product);
        this.orderProductList = [...this.orderProductList];
        this.preOrderFooter = new PreOrderFooter(this.orderProductList);
      }
      // console.log(this.orderProductList)
    }
  }

  openCustomerPopup(): void {
    const dialogRef = this.dialog.open(CustomerPopupContainerComponent, {
      panelClass: 'customer-modal-dialog'
    });
    dialogRef.afterClosed().subscribe((response: Customer) => {
      if (response) {
        this.orderForm.patchValue({
          id: response.id,
          name: response.name,
          company: response.company,
          address: response.address,
          phone: response.business_phone,
          city: response.city,
        });
      }
    });
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(OrderAddProductContainerComponent, {
      panelClass: 'product-modal-dialog'
    });
    dialogRef.afterClosed().subscribe((response: Product) => {
      if (response) {
        this.AddProductToList(response);
      }
    });
  }

  AddProductToList(item: Product): void {
    const product = new PreOrderProduct(0, item.id, item.product_name, item.standard_cost);
    this.orderProductList.push(product);
    this.orderProductList = [...this.orderProductList];

    this.preOrderFooter = new PreOrderFooter(this.orderProductList);
  }

  UpdateQuantity(event: any): any {
    const updatedProduct = { ...this.orderProductList[event.index] };
    updatedProduct.Quantity = Number(event.newValue);
    updatedProduct.Total_Value = Number((updatedProduct.Quantity * updatedProduct.Unit_Price).toFixed(2));

    this.orderProductList[event.index] = updatedProduct;
    this.orderProductList = [...this.orderProductList];

    this.preOrderFooter = new PreOrderFooter(this.orderProductList);
  }

  onSave() {
    const customer = { ...this.preOrderCustomer, ...this.orderForm.value };
    this.preOrder.Id = this.orderId;
    this.preOrder.CustomerId = customer.id;
    this.preOrder.OrderDate = moment(customer.fecha).format("YYYY/MM/DD");
    this.preOrder.OrderDetails = PreOrderDetail.mapOrderDetail(this.orderProductList);

    if (this.orderId === 0) {
      this.store.dispatch(new orderActions.AddOrder(this.preOrder));
    } else {
      this.store.dispatch(new orderActions.UpdateOrder(this.preOrder));
    }

  }

  onCancel(): void {
    this.router.navigate(['order']);
  }
}
