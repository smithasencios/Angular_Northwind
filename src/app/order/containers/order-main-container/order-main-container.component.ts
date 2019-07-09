import { Component, OnInit, AfterViewInit, ChangeDetectorRef, TemplateRef, ViewChild } from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import * as orderActions from '../../state/actions/order.actions';
import * as fromReducer from '../../state/reducers';
import { GetOrders } from '../../models/get-orders';
import { Observable } from 'rxjs';
import { OrderListItem } from '../../models/order-list-item';
import { TableViewComponent } from 'src/app/shared/components/table-view/table-view.component';
import { OrderListDetailItem } from '../../models/order-list-detail-item';

@Component({
  selector: 'app-order-main-container',
  templateUrl: './order-main-container.component.html',
  styleUrls: ['./order-main-container.component.scss']
})
export class OrderMainContainerComponent implements OnInit, AfterViewInit {

  orders$: Observable<OrderListItem[]> = this.store.select(fromReducer.getOrders);
  orderDetails$: Observable<OrderListDetailItem[]> = this.store.select(fromReducer.getOrdersDetails);

  length$: Observable<number> = this.store.select(fromReducer.gettotalOrderRecords);

  request: GetOrders;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 20, 50, 100];
  public columns: object[] = [];
  public detailColumns: object[] = [];
  @ViewChild("tableView") tableView: TableViewComponent<any>;
  @ViewChild("orderIdCellTemplate") private orderIdCellTemplate: TemplateRef<any>;
  @ViewChild("orderDateCellTemplate") private orderDateCellTemplate: TemplateRef<any>;
  @ViewChild("accionesCellTemplate") private accionesCellTemplate: TemplateRef<any>;

  constructor(private store: Store<fromReducer.OrderState>, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.refreshData();
  }
  ngAfterViewInit(): void {
    this.columns = this.getColumns();
    this.ref.detectChanges();
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

  private getColumns(): object[] {
    return [
      {
        name: "Id",
        flexGrow: 0.5,
        cellTemplate: this.orderIdCellTemplate
      },
      {
        name: "Customer",
        prop: "customer",
        flexGrow: 1
      },
      {
        name: "Status",
        prop: "status_name",
        flexGrow: 0.5
      },
      {
        name: "Order Date",
        cellTemplate: this.orderDateCellTemplate,
        flexGrow: 1
      },
      {
        name: "Acciones",
        cellTemplate: this.accionesCellTemplate,
        flexGrow: 1
      }
    ];
  }
  toggleExpandRow(row: any) {
    this.tableView.toggleExpandRow(row);
    this.store.dispatch(new orderActions.LoadOrdersDetail(row.order_id));
    this.ref.detectChanges();
  }
}
