import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EmployeeService } from '../../services/employee.service';
import * as employeeActions from '../actions/employee.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { FrontendBaseEffect } from 'src/app/shared/frontend-base-effect';
import { SnackbarWrapperService } from 'src/app/shared/services/snackbar-wrapper-service';
import { EmployeeSessionsErrorsComponent } from '../../components/employee-sessions-errors/employee-sessions-errors.component';

@Injectable()
export class EmployeeEffects extends FrontendBaseEffect {
    constructor(private actions$: Actions, private employeeService: EmployeeService, snackbarWrapperService: SnackbarWrapperService) {
        super(snackbarWrapperService);
    }
    @Effect()
    getEmployees$ = this.actions$.pipe(
        ofType<employeeActions.LoadEmployees>(employeeActions.EmployeeActionTypes.LoadEmployees),
        switchMap(action => this.employeeService.getEmployees(action.request)
            .pipe(
                map(data => new employeeActions.LoadEmployeesComplete(data))
            ))
    );
    @Effect()
    getEmployeesById$ = this.actions$.pipe(
        ofType<employeeActions.LoadEmployeeById>(employeeActions.EmployeeActionTypes.LoadEmployeeById),
        switchMap(action => this.employeeService.getEmployeeById(action.employeeId)
            .pipe(
                map(data => new employeeActions.LoadEmployeeByIdComplete(data))
            ))
    );
    @Effect()
    updateEmployee$ = this.actions$.pipe(
        ofType<employeeActions.UpdateEmployee>(employeeActions.EmployeeActionTypes.UpdateEmployee),
        switchMap(action => this.employeeService.updateEmployee(action.employee)
            .pipe(
                map(_ => new employeeActions.UpdateEmployeeComplete())
            ))
    );
    @Effect()
    deleteEmployees$ = this.actions$.pipe(
        ofType<employeeActions.DeleteEmployee>(employeeActions.EmployeeActionTypes.DeleteEmployee),
        switchMap(action => this.employeeService.deleteEmployee(action.employeeId)
            .pipe(
                map(data => new employeeActions.DeleteEmployeeComplete()),
                catchError((errorResponse: any) =>
                    this.handleError(new employeeActions.OnError(), errorResponse, EmployeeSessionsErrorsComponent)
                )
            ))
    );
    @Effect()
    getBestEmployee$ = this.actions$.pipe(
        ofType<employeeActions.LoadBestEmployee>(employeeActions.EmployeeActionTypes.LoadBestEmployee),
        switchMap(_ => this.employeeService.getBestEmployee()
            .pipe(
                map(data => new employeeActions.LoadBestEmployeeComplete(data))
            ))
    );
    @Effect()
    addEmployee$ = this.actions$.pipe(
        ofType<employeeActions.AddEmployee>(employeeActions.EmployeeActionTypes.AddEmployee),
        switchMap(action => this.employeeService.createEmployee(action.employee)
            .pipe(
                map(_ => new employeeActions.AddEmployeeComplete())
            ))
    );
}
