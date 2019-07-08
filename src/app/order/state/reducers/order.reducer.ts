import * as orderActions from '../actions/order.actions';
import { OrderList } from '../../models/order-list';
import { OrderListItem } from '../../models/order-list-item';

export interface State {
    totalRecords: number;
    orders: OrderListItem[];
}

const initialState: State = {
    totalRecords: 0,
    orders: []
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
        default:
            return state;
    }
}

export const getOrders = (state: State) => state.orders;
export const getTotalOrderRecords = (state: State) => state.totalRecords;