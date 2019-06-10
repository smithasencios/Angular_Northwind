import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { PreOrder } from '../../models/pre-order';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderTableComponent implements OnInit, OnChanges {

  @Input()
  items: PreOrder[];
  @Output()
  updateQuantity: EventEmitter<any> = new EventEmitter<any>();

  editing = {};
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items && changes.items.currentValue) {
      console.log(this.items)
    }
  }

  onUpdateCantidad(event: any, cell: any, rowIndex: any) {
    this.editing[rowIndex + '-' + cell] = false;
    const selectedObject = { index: rowIndex, newValue: event.target.value };
    this.updateQuantity.emit(selectedObject);
  }

  onRemoveItem(): void {

  }
}
