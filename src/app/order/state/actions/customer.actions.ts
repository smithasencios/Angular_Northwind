import { Action } from '@ngrx/store';
import { CustomerList } from '../../models/customer-list';
import { GetCustomers } from '../../models/get-customer';

export enum CustomerActionTypes {
    LoadCustomers = '[Order-Customer] Load Customers',
    LoadCustomersComplete = '[Order-Customer] Load Customers Complete',
    OnError = '[Order-Customer] On Error'
}

export class OnError implements Action {
    readonly type = CustomerActionTypes.OnError;
    constructor() { }
}
export class LoadCustomers implements Action {
    readonly type = CustomerActionTypes.LoadCustomers;
    constructor(public request: GetCustomers) { }
}
export class LoadCustomersComplete implements Action {
    readonly type = CustomerActionTypes.LoadCustomersComplete;
    constructor(public payload: CustomerList) { }
}

export type Actions =
    | OnError
    | LoadCustomers
    | LoadCustomersComplete;
