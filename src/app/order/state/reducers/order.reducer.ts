import * as orderActions from '../actions/order.actions';

export interface State {
    totalOrderRecords: number;
}

const initialState: State = {
    totalOrderRecords: 0
};

export function OrderReducer(state = initialState, action: orderActions.Actions): State {
    switch (action.type) {
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