import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/Employee';
import { Observable, Subject } from 'rxjs';
import { Store, ActionsSubject } from '@ngrx/store';
import * as employeeActions from '../../state/actions/employee.actions';
import * as fromReducer from '../../state/reducers';
import { GetEmployees } from '../../models/GetEmployees';
import { MatDialog } from '@angular/material';
import { EmployeeDetailPopupContainerComponent } from '../employee-detail-popup-container/employee-detail-popup-container.component';
import { EmployeeCreatePopupContainerComponent } from '../employee-create-popup-container/employee-create-popup-container.component';
import { AppConfirmService } from 'src/app/shared/components/app-confirm/app-confirm.service';
import { ConfirmData } from 'src/app/shared/models/ConfirmData';
import { takeUntil } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';
import { BestEmployee } from '../../models/BestEmployee';
import { EmployeeCreate2PopupContainerComponent } from '../employee-create2-popup-container/employee-create2-popup-container.component';
@Component({
  selector: 'app-employee-main-container',
  templateUrl: './employee-main-container.component.html',
  styleUrls: ['./employee-main-container.component.scss']
})
export class EmployeeMainContainerComponent implements OnInit {

  employees$: Observable<Employee[]> = this.store.select(fromReducer.getEmployees);
  length$: Observable<number> = this.store.select(fromReducer.gettotalRecords);
  bestEmployees$: Observable<BestEmployee> = this.store.select(fromReducer.getBestEmployee);

  request: GetEmployees;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  protected ngUnsubscribe: Subject<any> = new Subject<any>();

  constructor(private store: Store<fromReducer.EmployeeState>, private dialog: MatDialog,
    private confirm: AppConfirmService, private actionsSubject$: ActionsSubject) {
    this.triggers();
  }

  ngOnInit() {
    this.refreshData();
  }
  triggers() {
    this.actionsSubject$
      .pipe(takeUntil(this.ngUnsubscribe))
      .pipe(ofType(employeeActions.EmployeeActionTypes.DeleteEmployeeComplete))
      .subscribe(_ => {
        this.refreshData();
      });
  }
  changePage(event: any): void {
    const offSet = event.pageIndex * event.pageSize;
    this.pageSize = event.pageSize;
    this.request = new GetEmployees(event.pageSize, offSet);
    this.store.dispatch(new employeeActions.LoadEmployees(this.request));
  }
  viewDetails(event: any): void {
    const dialogRef = this.dialog.open(EmployeeDetailPopupContainerComponent, {
      width: '50vw',
      data: { employeeId: event.id }
    });
    dialogRef.afterClosed().subscribe(_ => {
      this.refreshData();
    });
  }
  onEdit(event: any): void {
    const dialogRef = this.dialog.open(EmployeeCreatePopupContainerComponent, {
      width: '40vw',
      data: { employeeId: event.id }
    });
    dialogRef.afterClosed().subscribe(_ => {
      this.refreshData();
    });
  }
  onDelete(event: any): void {
    const confirmData = new ConfirmData('Delete Employee', '¿Estas seguro de eliminar el empleado?', true);

    this.confirm.confirm(confirmData)
      .subscribe(result => {
        if (result) {
          this.store.dispatch(new employeeActions.DeleteEmployee(event.id));
        }
      });
  }
  onNew(): void {
    const dialogRef = this.dialog.open(EmployeeCreate2PopupContainerComponent, {
      width: '50vw'
    });
    dialogRef.afterClosed().subscribe(_ => {
      this.refreshData();
    });
  }
  refreshData(): void {
    this.request = new GetEmployees(this.pageSizeOptions[0], 0);
    this.store.dispatch(new employeeActions.LoadEmployees(this.request));
    this.store.dispatch(new employeeActions.LoadBestEmployee());
  }
}
