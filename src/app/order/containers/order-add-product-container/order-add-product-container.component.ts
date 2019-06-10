import { Component, OnInit } from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import * as productActions from '../../state/actions/product.actions';
import * as fromReducer from '../../state/reducers';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { GetProducts } from '../../models/get_products';

@Component({
  selector: 'app-order-add-product-container',
  templateUrl: './order-add-product-container.component.html',
  styleUrls: ['./order-add-product-container.component.scss']
})
export class OrderAddProductContainerComponent implements OnInit {

  products$: Observable<Product[]> = this.store.select(fromReducer.getProducts);
  length$: Observable<number> = this.store.select(fromReducer.gettotalProductRecords);

  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20, 30];
  request: GetProducts;

  constructor(private store: Store<fromReducer.OrderState>) { }

  ngOnInit() {    
    this.request = new GetProducts(this.pageSizeOptions[0], 0);
    this.store.dispatch(new productActions.LoadProducts(this.request));
  }
  changePage(event: any): void {
    const offSet = event.pageIndex * event.pageSize;
    this.pageSize = event.pageSize;
    this.request = new GetProducts(event.pageSize, offSet);
    this.store.dispatch(new productActions.LoadProducts(this.request));
  }
}
