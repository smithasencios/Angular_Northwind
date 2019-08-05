import { Component, OnInit, Input, TemplateRef, ViewChild, ViewEncapsulation, SimpleChanges, OnChanges } from '@angular/core';
import { WindowService } from './table-view-window-service';
import { fromEvent as observableFromEvent } from 'rxjs';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableViewComponent<T> implements OnInit, OnChanges {

  @Input() minTableHeight: number = 500;
  @Input() items: any[] = [];
  @Input() columns: any[] = [];
  @Input() limit?: number;
  @Input() detailTemplate: TemplateRef<any>;

  @ViewChild('myTable', { static: false }) table: any;

  DEVICE_WIDTH: number = 0;
  tableColumns: any[] = [];
  SM_MIN_WIDTH: number = 0;
  MD_MIN_WIDTH: number = 960;
  LG_MIN_WIDTH: number = 1280;

  constructor(private windowService: WindowService) { }

  ngOnInit() {
    this.DEVICE_WIDTH = window.innerWidth;
    this.windowService.setWindowWidth(window.innerWidth);
    this.tableColumns = this.getTableColumns();
    observableFromEvent(window, "resize").subscribe((event: any) => {
      this.DEVICE_WIDTH = event.target.innerWidth;
      this.windowService.setWindowWidth(this.DEVICE_WIDTH);
      this.tableColumns = this.getTableColumns();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns && this.columns) {
      this.DEVICE_WIDTH = this.windowService.getWindowWidth();
      this.tableColumns = this.getTableColumns();
    }
  }

  getTableColumns(): object[] {
    if (this.DEVICE_WIDTH >= this.LG_MIN_WIDTH) {
      return this.columns.filter(x => !x.hideLG);
    }
    if (this.DEVICE_WIDTH >= this.MD_MIN_WIDTH) {
      return this.columns.filter(x => !x.hideMD);
    }
    if (this.DEVICE_WIDTH > this.SM_MIN_WIDTH) {
      return this.columns.filter(x => !x.hideSM);
    }
    return this.columns;
  }

  toggleExpandRow(row: any) {
    this.table.rowDetail.toggleExpandRow(row);
  }
}
