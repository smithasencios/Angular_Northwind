import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as productActions from '../../state/actions/product.actions';
import * as fromReducer from '../../state/reducers';
import { ProductBestSeller } from '../../models/product-best-seller';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-best-seller-products-container',
  templateUrl: './best-seller-products-container.component.html',
  styleUrls: ['./best-seller-products-container.component.scss']
})
export class BestSellerProductsContainerComponent implements OnInit {

  products$: Observable<ProductBestSeller[]> = this.store.select(fromReducer.getBestSellers);

  constructor(private store: Store<fromReducer.ProductState>) {
    this.store.dispatch(new productActions.GetBestSellers());
  }

  ngOnInit() {
  }

}
