import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OrderMainContainerComponent } from './containers/order-main-container/order-main-container.component';
import { OrderNewContainerComponent } from './containers/order-new-container/order-new-container.component';

export const routes: Routes = [
  {
    path: '',
    component: OrderMainContainerComponent
  },
  {
    path: 'manage',
    component: OrderNewContainerComponent
  },
  {
    path: 'detail/:id',
    component : OrderNewContainerComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
