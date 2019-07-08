import { Component, OnInit } from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import * as orderActions from '../../state/actions/order.actions';
import * as fromReducer from '../../state/reducers';
import { GetOrders } from '../../models/get-orders';
import { Observable } from 'rxjs';
import { OrderListItem } from '../../models/order-list-item';

@Component({
  selector: 'app-order-main-container',
  templateUrl: './order-main-container.component.html',
  styleUrls: ['./order-main-container.component.scss']
})
export class OrderMainContainerComponent implements OnInit {

  orders$: Observable<OrderListItem[]> = this.store.select(fromReducer.getOrders);
  length$: Observable<number> = this.store.select(fromReducer.gettotalOrderRecords);

  request: GetOrders;
  pageSize = 10;
  pageSizeOptions: number[] = [10,20, 50, 100];

  constructor(private store: Store<fromReducer.OrderState>) { }

  ngOnInit() {
    this.refreshData();
  }
  changePage(event: any): void {
    const offSet = event.pageIndex * event.pageSize;
    this.pageSize = event.pageSize;
    this.request = new GetOrders(event.pageSize, offSet);
    this.store.dispatch(new orderActions.LoadOrders(this.request));
  }
  refreshData(): void {
    this.request = new GetOrders(this.pageSizeOptions[0], 0);
    this.store.dispatch(new orderActions.LoadOrders(this.request));
  }
}
