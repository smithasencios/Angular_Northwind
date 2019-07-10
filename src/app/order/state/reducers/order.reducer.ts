import * as orderActions from '../actions/order.actions';
import { OrderList } from '../../models/order-list';
import { OrderListItem } from '../../models/order-list-item';
import { OrderListDetailItem } from '../../models/order-list-detail-item';
import { OrderListDetail } from '../../models/order-list-detail';

export interface State {
    totalRecords: number;
    orders: OrderListItem[];
    orderListDetails: OrderListDetail;
}

const initialState: State = {
    totalRecords: 0,
    orders: [],
    orderListDetails: new OrderListDetail()
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
        case orderActions.OrderActionTypes.LoadOrdersDetail: {
            return state;
        }
        case orderActions.OrderActionTypes.LoadOrdersDetailComplete: {
            return {
                ...state,
                orderListDetails: action.payload
            };
        }
        default:
            return state;
    }
}

export const getOrders = (state: State) => state.orders;
export const getTotalOrderRecords = (state: State) => state.totalRecords;
export const getOrderListDetails = (state: State) => state.orderListDetails;