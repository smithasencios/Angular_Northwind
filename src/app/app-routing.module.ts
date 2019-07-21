import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/authguard.';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'employee',
    loadChildren: './employee/employee.module#EmployeeModule'
    // canLoad: [AuthGuard]
  },
  {
    path: 'product',
    loadChildren: './product/product.module#ProductModule'
  },
  {
    path: 'order',
    loadChildren: './order/order.module#OrderModule'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'callback',
    loadChildren: './login/login.module#LoginModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
