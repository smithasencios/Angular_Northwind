import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-order-add-product',
  templateUrl: './order-add-product.component.html',
  styleUrls: ['./order-add-product.component.scss']
})
export class OrderAddProductComponent implements OnInit {

  @Input()
  products: Product;

  selectedProduct: Product;

  constructor(private dialogRef: MatDialogRef<OrderAddProductComponent>) { }

  ngOnInit() {
  }

  onSelect(event: any, row: Product) {
    if (event.source.checked) {
      this.selectedProduct = row;
    }
  }

  selectRow(): void {
    this.dialogRef.close(this.selectedProduct);
  }

}
