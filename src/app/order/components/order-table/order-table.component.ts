import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { PreOrderProduct } from '../../models/pre-order-product';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderTableComponent implements OnInit {

  @Input()
  items: PreOrderProduct[];
  @Output()
  updateQuantity: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  deleteProductOrder: EventEmitter<any> = new EventEmitter<any>();

  editing = {};
  constructor() { }

  ngOnInit() {
  }

  onUpdateCantidad(event: any, cell: any, rowIndex: any) {
    this.editing[rowIndex + '-' + cell] = false;
    const selectedObject = { index: rowIndex, newValue: event.target.value };
    this.updateQuantity.emit(selectedObject);
  }

  onRemoveItem(event: any): void {
    this.deleteProductOrder.emit(event);
  }
}
