import * as orderActions from '../actions/order.actions';
import { OrderListItem } from '../../models/order-list-item';
import { SearchOrderCriteria } from '../../models/search-order-criteria';

export interface State {
    totalRecords: number;
    orders: OrderListItem[];
    orderListItem: OrderListItem;
    query: SearchOrderCriteria;
}

const initialState: State = {
    totalRecords: 0,
    orders: [],
    orderListItem: new OrderListItem(),
    query: new SearchOrderCriteria()
};

export function OrderReducer(state = initialState, action: orderActions.Actions): State {
    switch (action.type) {
        case orderActions.OrderActionTypes.LoadOrders: {
            return state;
        }
        case orderActions.OrderActionTypes.LoadOrdersComplete: {
            return {
                ...state,
                orders: action.payload.data,
                totalRecords: action.payload.totalRecords
            };
        }
        case orderActions.OrderActionTypes.AddOrder: {
            return state;
        }
        case orderActions.OrderActionTypes.AddOrderComplete: {
            return state;
        }
        case orderActions.OrderActionTypes.LoadOrderById: {
            return state;
        }
        case orderActions.OrderActionTypes.LoadOrderByIdComplete: {
            return {
                ...state,
                orderListItem: action.payload
            };
        }
        case orderActions.OrderActionTypes.UpdateOrderSearchCriteria: {
            if (action.payload) {
                return {
                    ...state,
                    query: action.payload
                };
            }
            return state;
        }
        default:
            return state;
    }
}

export const getOrders = (state: State) => state.orders;
export const getTotalOrderRecords = (state: State) => state.totalRecords;
export const getOrderById = (state: State) => state.orderListItem;
export const getQuery = (state: State) => state.query;