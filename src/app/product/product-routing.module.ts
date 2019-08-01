import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductMainContainerComponent } from './containers/product-main-container/product-main-container.component';
import { Routes, RouterModule } from '@angular/router';
import { ProductListContainerComponent } from './containers/product-list-container/product-list-container.component';
import { ProductNewContainerComponent } from './containers/product-new-container/product-new-container.component';
import { ProductNewGuard } from './guards/product-new.guard';
import { BestSellerProductsContainerComponent } from './containers/best-seller-products-container/best-seller-products-container.component';
import { AuthGuard } from '../auth/guards/authguard.';
import { PermissionCodes } from '../shared/constants/permission-codes';

export const routes: Routes = [
  {
    path: '',
    component: ProductMainContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ProductListContainerComponent,
        canActivate: [AuthGuard],
        data: { expectedPermission: PermissionCodes.ReadProductos }
      },
      {
        path: 'new',
        component: ProductNewContainerComponent,
        canDeactivate: [ProductNewGuard]
      },
      {
        path: 'bestSellers',
        component: BestSellerProductsContainerComponent
      }
    ]
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
export class ProductRoutingModule { }
