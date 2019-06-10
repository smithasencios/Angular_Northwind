import { Component, OnInit } from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import * as productActions from '../../state/actions/product.actions';
import * as fromReducer from '../../state/reducers';
import { Observable, Subject } from 'rxjs';
import { Product } from '../../models/product';
import { GetProducts } from '../../models/get-products';
import { AppConfirmService } from 'src/app/shared/components/app-confirm/app-confirm.service';
import { ConfirmData } from 'src/app/shared/models/ConfirmData';
import { takeUntil } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';
import { MatDialog } from '@angular/material';
import { ProductEditContainerComponent } from '../product-edit-container/product-edit-container.component';

@Component({
  selector: 'app-product-list-container',
  templateUrl: './product-list-container.component.html',
  styleUrls: ['./product-list-container.component.scss']
})
export class ProductListContainerComponent implements OnInit {

  employees$: Observable<Product[]> = this.store.select(fromReducer.getProducts);
  length$: Observable<number> = this.store.select(fromReducer.gettotalRecords);

  pageSize = 10;
  pageSizeOptions: number[] = [10, 20, 30, 50];
  request: GetProducts;
  protected ngUnsubscribe: Subject<any> = new Subject<any>();

  constructor(private store: Store<fromReducer.ProductState>,
    private confirm: AppConfirmService, private actionsSubject$: ActionsSubject, private dialog: MatDialog) {
    this.triggers();
  }

  ngOnInit() {
    this.refreshData();
  }
  triggers() {
    this.actionsSubject$
      .pipe(takeUntil(this.ngUnsubscribe))
      .pipe(ofType(productActions.ProductActionTypes.DeleteProductComplete))
      .subscribe(_ => {
        this.refreshData();
      });
  }
  refreshData(): void {
    this.request = new GetProducts(this.pageSizeOptions[0], 0);
    this.store.dispatch(new productActions.LoadProducts(this.request));
  }
  changePage(event: any): void {
    const offSet = event.pageIndex * event.pageSize;
    this.pageSize = event.pageSize;
    this.request = new GetProducts(event.pageSize, offSet);
    this.store.dispatch(new productActions.LoadProducts(this.request));
  }
  onDelete(projectId: number): void {
    const confirmData = new ConfirmData('Delete Project', '¿Estas seguro de eliminar el proyecto?', true);

    this.confirm.confirm(confirmData)
      .subscribe(result => {
        if (result) {
          this.store.dispatch(new productActions.DeleteProduct(projectId));
        }
      });
  }
  onEdit(productId: number): void {
    const dialogRef = this.dialog.open(ProductEditContainerComponent, {
      width: '40vw',
      data: { productId }
    });
    dialogRef.afterClosed().subscribe(_ => {
      this.refreshData();
    });
  }
}
