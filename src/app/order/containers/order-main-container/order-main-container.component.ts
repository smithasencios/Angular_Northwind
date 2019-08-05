import { Component, OnInit, AfterViewInit, ChangeDetectorRef, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as orderActions from '../../state/actions/order.actions';
import * as fromReducer from '../../state/reducers';
import { GetOrders } from '../../models/get-orders';
import { Observable } from 'rxjs';
import { OrderListItem } from '../../models/order-list-item';
import { TableViewComponent } from 'src/app/shared/components/table-view/table-view.component';
import { Status } from 'src/app/shared/models/status';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SearchOrderCriteria } from '../../models/search-order-criteria';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-main-container',
  templateUrl: './order-main-container.component.html',
  styleUrls: ['./order-main-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderMainContainerComponent implements OnInit, AfterViewInit {

  orders$: Observable<OrderListItem[]> = this.store.select(fromReducer.getOrders);
  length$: Observable<number> = this.store.select(fromReducer.gettotalOrderRecords);

  request: GetOrders;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 20, 50, 100];
  public columns: object[] = [];
  public detailColumns: object[] = [];
  estados: Status[] = this.getEstados();
  searchForm: FormGroup;

  @ViewChild("tableView", { static: false }) tableView: TableViewComponent<any>;
  @ViewChild("orderIdCellTemplate", { static: false }) private orderIdCellTemplate: TemplateRef<any>;
  @ViewChild("orderDateCellTemplate", { static: false }) private orderDateCellTemplate: TemplateRef<any>;
  @ViewChild("accionesCellTemplate", { static: false }) private accionesCellTemplate: TemplateRef<any>;

  constructor(private fb: FormBuilder, private store: Store<fromReducer.OrderState>,
    private ref: ChangeDetectorRef, private router: Router) {
    this.buildSearchForm();
  }

  ngOnInit() {
    this.refreshData();
  }
  ngAfterViewInit(): void {
    this.columns = this.getColumns();
    this.detailColumns = this.getDetailColumns();
    this.ref.detectChanges();
  }

  buildSearchForm() {
    this.searchForm = this.fb.group({
      date_from: ['', []],
      date_to: ['', []],
      status: ['', []],
    });
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
        prop: "Customer",
        flexGrow: 1
      },
      {
        name: "Status",
        prop: "Status_Name",
        flexGrow: 0.5
      },
      {
        name: "Order Date",
        cellTemplate: this.orderDateCellTemplate,
        flexGrow: 1,
        hideSM: true
      },
      {
        name: "Acciones",
        cellTemplate: this.accionesCellTemplate,
        flexGrow: 1
      }
    ];
  }

  private getDetailColumns(): object[] {
    return [
      {
        name: "Product Name",
        prop: "ProductName",
        flexGrow: 1
      },
      {
        name: "Quantity",
        prop: "Quantity",
        flexGrow: 1
      },
      {
        name: "UnitPrice",
        prop: "UnitPrice",
        flexGrow: 0.5
      }
    ];
  }

  toggleExpandRow(row: any) {
    this.tableView.toggleExpandRow(row);
    this.ref.detectChanges();
  }

  getEstados(): Status[] {
    return [
      Status.CreateInstance(0, "New"),
      Status.CreateInstance(1, "Invoiced"),
      Status.CreateInstance(2, "Shipped"),
      Status.CreateInstance(3, "Closed")
    ];
  }

  search(): void {
    if (this.searchForm.valid) {
      if (this.searchForm.dirty) {
        let searchOrderCriteria: SearchOrderCriteria;
        const newSearchCriteria = { ...searchOrderCriteria, ...this.searchForm.value };
        this.store.dispatch(new orderActions.UpdateOrderSearchCriteria(newSearchCriteria));
        this.refreshData();

      } else {
        console.log('no se actualizo nada.')
      }

    }
  }

  onViewDetail(row: any): void {
    this.router.navigate(['/order/detail/', row.Order_Id]);
  }
}
