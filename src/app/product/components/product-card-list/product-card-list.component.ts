import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card-list',
  templateUrl: './product-card-list.component.html',
  styleUrls: ['./product-card-list.component.scss']
})
export class ProductCardListComponent implements OnInit {

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
