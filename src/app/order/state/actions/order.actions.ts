import { Action } from '@ngrx/store';
import { PreOrder } from '../../models/pre-order';
import { GetOrders } from '../../models/get-orders';
import { OrderList } from '../../models/order-list';
import { SearchOrderCriteria } from '../../models/search-order-criteria';
import { OrderListItem } from '../../models/order-list-item';

export enum OrderActionTypes {
    AddOrder = '[Order] Add Order',
    AddOrderComplete = '[Order] Add Order Complete',
    UpdateOrder = '[Order] Update Order',
    UpdateOrderComplete = '[Order] Update Order Complete',
    LoadOrders = '[Order] Load Orders',
    LoadOrdersComplete = '[Order] Load Orders Complete',
    LoadOrderById = '[Order] Load Order By Id',
    LoadOrderByIdComplete = '[Order] Load Order By Id Complete',
    UpdateOrderSearchCriteria = '[Order] Update Order Search Criteria',
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
export class UpdateOrder implements Action {
    readonly type = OrderActionTypes.UpdateOrder;
    constructor(public request: PreOrder) { }
}
export class UpdateOrderComplete implements Action {
    readonly type = OrderActionTypes.UpdateOrderComplete;
    constructor() { }
}
export class LoadOrders implements Action {
    readonly type = OrderActionTypes.LoadOrders;
    constructor(public request: GetOrders) { }
}
export class LoadOrdersComplete implements Action {
    readonly type = OrderActionTypes.LoadOrdersComplete;
    constructor(public payload: OrderList) { }
}

export class LoadOrderById implements Action {
    readonly type = OrderActionTypes.LoadOrderById;
    constructor(public orderId: number) { }
}
export class LoadOrderByIdComplete implements Action {
    readonly type = OrderActionTypes.LoadOrderByIdComplete;
    constructor(public payload: OrderListItem) { }
}
export class UpdateOrderSearchCriteria implements Action {
    readonly type = OrderActionTypes.UpdateOrderSearchCriteria;
    constructor(public payload: SearchOrderCriteria) { }
}
export type Actions =
    | AddOrder
    | AddOrderComplete
    | LoadOrders
    | LoadOrdersComplete
    | LoadOrderById
    | LoadOrderByIdComplete
    | UpdateOrderSearchCriteria
    | UpdateOrder
    | UpdateOrderComplete
    | OnError;