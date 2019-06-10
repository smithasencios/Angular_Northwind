import { Component, OnInit } from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import * as customerActions from '../../state/actions/customer.actions';
import * as fromReducer from '../../state/reducers';
import { Customer } from '../../models/customer';
import { Observable } from 'rxjs';
import { GetCustomers } from '../../models/get-customer';

@Component({
  selector: 'app-customer-popup-container',
  templateUrl: './customer-popup-container.component.html',
  styleUrls: ['./customer-popup-container.component.scss']
})
export class CustomerPopupContainerComponent implements OnInit {

  customers$: Observable<Customer[]> = this.store.select(fromReducer.getcustomers);
  length$: Observable<number> = this.store.select(fromReducer.gettotalCustomerRecords);

  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20, 30];
  request: GetCustomers;
  constructor(private store: Store<fromReducer.OrderState>) { }

  ngOnInit() {
    this.request = new GetCustomers(this.pageSizeOptions[0], 0);
    this.store.dispatch(new customerActions.LoadCustomers(this.request));
  }

  changePage(event: any): void {
    const offSet = event.pageIndex * event.pageSize;
    this.pageSize = event.pageSize;
    this.request = new GetCustomers(event.pageSize, offSet);
    this.store.dispatch(new customerActions.LoadCustomers(this.request));
  }

}
