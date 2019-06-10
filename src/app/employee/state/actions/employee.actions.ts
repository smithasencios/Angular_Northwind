import { Action } from '@ngrx/store';
import { GetEmployees } from '../../models/GetEmployees';
import { EmployeeList } from '../../models/EmployeeList';
import { Employee } from '../../models/Employee';
import { BestEmployee } from '../../models/BestEmployee';

export enum EmployeeActionTypes {
    LoadEmployees = '[Employee] Load Employees',
    LoadEmployeesComplete = '[Employee] Load Employees Complete',
    LoadEmployeeById = '[Employee] Load Employee By Id',
    LoadEmployeeByIdComplete = '[Employee] Load Employee By Id Complete',
    UpdateEmployee = '[Employee] Update Employee',
    UpdateEmployeeComplete = '[Employee] Update Employee Complete',
    DeleteEmployee = '[Employee] Delete Employee',
    DeleteEmployeeComplete = '[Employee] Delete Employee Complete',
    LoadBestEmployee = '[Employee] Load Best Employee',
    LoadBestEmployeeComplete = '[Employee] Load Best Employee Complete',
    AddEmployee = '[Employee] Add Employee',
    AddEmployeeComplete = '[Employee] Add Employee Complete',
    OnError = '[Employee] On Error',
}
export class OnError implements Action {
    readonly type = EmployeeActionTypes.OnError;
    constructor() { }
}
export class LoadBestEmployee implements Action {
    readonly type = EmployeeActionTypes.LoadBestEmployee;
    constructor() { }
}
export class LoadBestEmployeeComplete implements Action {
    readonly type = EmployeeActionTypes.LoadBestEmployeeComplete;
    constructor(public payload: BestEmployee) { }
}
export class LoadEmployees implements Action {
    readonly type = EmployeeActionTypes.LoadEmployees;
    constructor(public request: GetEmployees) { }
}
export class LoadEmployeesComplete implements Action {
    readonly type = EmployeeActionTypes.LoadEmployeesComplete;
    constructor(public payload: EmployeeList) { }
}
export class LoadEmployeeById implements Action {
    readonly type = EmployeeActionTypes.LoadEmployeeById;
    constructor(public employeeId: number) { }
}
export class LoadEmployeeByIdComplete implements Action {
    readonly type = EmployeeActionTypes.LoadEmployeeByIdComplete;
    constructor(public payload: Employee) { }
}
export class UpdateEmployee implements Action {
    readonly type = EmployeeActionTypes.UpdateEmployee;
    constructor(public employee: Employee) { }
}
export class UpdateEmployeeComplete implements Action {
    readonly type = EmployeeActionTypes.UpdateEmployeeComplete;
    constructor() { }
}
export class DeleteEmployee implements Action {
    readonly type = EmployeeActionTypes.DeleteEmployee;
    constructor(public employeeId: number) { }
}
export class DeleteEmployeeComplete implements Action {
    readonly type = EmployeeActionTypes.DeleteEmployeeComplete;
    constructor() { }
}
export class AddEmployee implements Action {
    readonly type = EmployeeActionTypes.AddEmployee;
    constructor(public employee: Employee) { }
}
export class AddEmployeeComplete implements Action {
    readonly type = EmployeeActionTypes.AddEmployeeComplete;
    constructor() { }
}
export type Actions =
    | LoadEmployees
    | LoadEmployeesComplete
    | LoadEmployeeById
    | LoadEmployeeByIdComplete
    | UpdateEmployee
    | UpdateEmployeeComplete
    | DeleteEmployee
    | DeleteEmployeeComplete
    | LoadBestEmployee
    | LoadBestEmployeeComplete
    | AddEmployee
    | AddEmployeeComplete
    | OnError;

