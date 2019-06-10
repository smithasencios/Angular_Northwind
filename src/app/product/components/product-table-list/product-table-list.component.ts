import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-table-list',
  templateUrl: './product-table-list.component.html',
  styleUrls: ['./product-table-list.component.scss']
})
export class ProductTableListComponent implements OnInit {

  @Input()
  items: Product[];
  @Output()
  delete: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  edit: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  onDelete(projectId: number): void {
    this.delete.emit(projectId);
  }
  onEdit(projectId: number): void {
    this.edit.emit(projectId);
  }
}
