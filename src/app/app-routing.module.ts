import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guards/authguard.';
import { CallbackComponent } from './auth/callback/callback.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'employee',
    loadChildren: './employee/employee.module#EmployeeModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'product',
    loadChildren: './product/product.module#ProductModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'order',
    loadChildren: './order/order.module#OrderModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'callback',
    component: CallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
