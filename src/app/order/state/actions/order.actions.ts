import { Action } from '@ngrx/store';
import { PreOrder } from '../../models/pre-order';
export enum OrderActionTypes {
    AddOrder = '[Order] Add Order',
    AddOrderComplete = '[Order] Add Order Complete',
    OnError = '[Order] On Error'
}

export class OnError implements Action {
    readonly type = OrderActionTypes.OnError;
    constructor() { }
}

export class AddOrder implements Action {
    readonly type = OrderActionTypes.AddOrder;
    constructor(public request: PreOrder) { }
}
export class AddOrderComplete implements Action {
    readonly type = OrderActionTypes.AddOrderComplete;
    constructor(public orderId: number) { }
}

export type Actions =
    | AddOrder
    | AddOrderComplete
    | OnError;