import { Action } from '@ngrx/store';
import { PreOrder } from '../../models/pre-order';
import { GetOrders } from '../../models/get-orders';
import { OrderList } from '../../models/order-list';
export enum OrderActionTypes {
    AddOrder = '[Order] Add Order',
    AddOrderComplete = '[Order] Add Order Complete',
    LoadOrders = '[Order] Load Orders',
    LoadOrdersComplete = '[Order] Load Orders Complete',
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

export class LoadOrders implements Action {
    readonly type = OrderActionTypes.LoadOrders;
    constructor(public request: GetOrders) { }
}
export class LoadOrdersComplete implements Action {
    readonly type = OrderActionTypes.LoadOrdersComplete;
    constructor(public payload: OrderList) { }
}

export type Actions =
    | AddOrder
    | AddOrderComplete
    | LoadOrders
    | LoadOrdersComplete
    | OnError;