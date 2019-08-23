import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { OrderMainContainerComponent } from './containers/order-main-container/order-main-container.component';
import { SharedModule } from '../shared/shared.module';
import { OrderNewContainerComponent } from './containers/order-new-container/order-new-container.component';
import { CustomerPopupContainerComponent } from './containers/customer-popup-container/customer-popup-container.component';
import { CustomerPopupComponent } from './components/customer-popup/customer-popup.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './state/reducers';
import { CustomerEffects } from './state/effects/customer.effects';
import { OrderAddProductComponent } from './components/order-add-product/order-add-product.component';
import { OrderAddProductContainerComponent } from './containers/order-add-product-container/order-add-product-container.component';
import { ProductEffects } from './state/effects/product.effects';
import { OrderTableComponent } from './components/order-table/order-table.component';
import { OrderEffects } from './state/effects/order.effects';
import { OrderErrorsComponent } from './components/order-errors/order-errors.component';

@NgModule({
  declarations: [OrderMainContainerComponent, OrderNewContainerComponent, CustomerPopupContainerComponent,
    CustomerPopupComponent, OrderAddProductComponent, OrderAddProductContainerComponent, OrderTableComponent, OrderErrorsComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    StoreModule.forFeature('order', reducers),
    EffectsModule.forFeature([CustomerEffects, ProductEffects,OrderEffects])
  ],
  entryComponents: [CustomerPopupContainerComponent, OrderAddProductContainerComponent]
})
export class OrderModule { }
