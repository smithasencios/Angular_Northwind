import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { OrderListItem } from '../../models/order-list-item';

@Component({
  selector: 'app-order-list-table',
  templateUrl: './order-list-table.component.html',
  styleUrls: ['./order-list-table.component.scss']
})
export class OrderListTableComponent implements OnInit, OnChanges {

  @Input()
  orders: OrderListItem[]

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.orders && changes.orders.currentValue) {
      console.log("Begin Order List")
      console.log(this.orders)
      console.log("End Order List")
    }
  }
}
