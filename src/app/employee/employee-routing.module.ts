import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeMainContainerComponent } from './containers/employee-main-container/employee-main-container.component';
import { AuthGuard } from '../auth/guards/authguard.';
import { PermissionCodes } from '../shared/constants/permission-codes';

export const routes: Routes = [
  {
    path: '',
    component: EmployeeMainContainerComponent,
    // canActivate: [AuthGuard],
    // data: { expectedPermissions: [PermissionCodes.ReadOrders] }
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
export class EmployeeRoutingModule { }
