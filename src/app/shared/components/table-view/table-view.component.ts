import { Component, OnInit, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableViewComponent<T> implements OnInit {

  @Input() items: object[] = [];
  @Input() columns: object[] = [];
  @Input() limit?: number;
  @Input() detailTemplate: TemplateRef<any>;

  @ViewChild('myTable') table: any;

  constructor() { }

  ngOnInit() {
  }
  toggleExpandRow(row: any) {
    this.table.rowDetail.toggleExpandRow(row);
  }
}
