import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductMainContainerComponent } from './containers/product-main-container/product-main-container.component';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductListContainerComponent } from './containers/product-list-container/product-list-container.component';
import { ProductNewContainerComponent } from './containers/product-new-container/product-new-container.component';
import { reducers } from './state/reducers';
import { ProductEffects } from './state/effects/product.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductTableListComponent } from './components/product-table-list/product-table-list.component';
import { ProductCardListComponent } from './components/product-card-list/product-card-list.component';
import { ProductEditContainerComponent } from './containers/product-edit-container/product-edit-container.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { BestSellerProductsContainerComponent } from './containers/best-seller-products-container/best-seller-products-container.component';
import { BestSellerProductChartComponent } from './components/best-seller-product-chart/best-seller-product-chart.component';

@NgModule({
  declarations: [ProductMainContainerComponent, ProductListContainerComponent, ProductNewContainerComponent, ProductTableListComponent, ProductCardListComponent, ProductEditContainerComponent, ProductEditComponent, BestSellerProductsContainerComponent, BestSellerProductChartComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    StoreModule.forFeature('product', reducers),
    EffectsModule.forFeature([ProductEffects])
  ],
  entryComponents: [ProductEditContainerComponent]
})
export class ProductModule { }
