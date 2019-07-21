import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeMainContainerComponent } from './containers/employee-main-container/employee-main-container.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EmployeeEffects } from './state/effects/employee.effects';
import { reducers } from './state/reducers';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeeDetailPopupContainerComponent } from './containers/employee-detail-popup-container/employee-detail-popup-container.component';
import { EmployeeDetailPopupComponent } from './components/employee-detail-popup/employee-detail-popup.component';
import { EmployeeCreatePopupContainerComponent } from './containers/employee-create-popup-container/employee-create-popup-container.component';
import { EmployeeCreatePopupComponent } from './components/employee-create-popup/employee-create-popup.component';
import { EmployeeBestComponent } from './components/employee-best/employee-best.component';
import { EmployeeCreate2PopupContainerComponent }
  from './containers/employee-create2-popup-container/employee-create2-popup-container.component';
import { EmployeeCreate2PopupComponent } from './components/employee-create2-popup/employee-create2-popup.component';
import { EmployeeSessionsErrorsComponent } from './components/employee-sessions-errors/employee-sessions-errors.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '../shared/interceptors/AuthHttpInterceptor';

@NgModule({
  declarations: [EmployeeMainContainerComponent, EmployeeListComponent,
    EmployeeDetailPopupContainerComponent, EmployeeDetailPopupComponent, EmployeeCreatePopupContainerComponent,
    EmployeeCreatePopupComponent,
    EmployeeBestComponent,
    EmployeeCreate2PopupContainerComponent,
    EmployeeCreate2PopupComponent,
    EmployeeSessionsErrorsComponent],
  imports: [
    CommonModule,
    SharedModule,
    EmployeeRoutingModule,
    StoreModule.forFeature('employee', reducers),
    EffectsModule.forFeature([EmployeeEffects])
  ],
  entryComponents: [EmployeeDetailPopupContainerComponent, EmployeeCreatePopupContainerComponent,
    EmployeeCreate2PopupContainerComponent, EmployeeSessionsErrorsComponent]
})
export class EmployeeModule { }
