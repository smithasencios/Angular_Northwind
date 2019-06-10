import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCustomerReducer from '../reducers/customer.reducer';
import * as fromProductReducer from '../reducers/product.reducer';

export interface OrderState {
    customer: fromCustomerReducer.State;
    product: fromProductReducer.State;
}
export const reducers: ActionReducerMap<OrderState> = {
    customer: fromCustomerReducer.CustomerReducer,
    product: fromProductReducer.ProductReducer
};

export const getOrderModuleState = createFeatureSelector<OrderState>('order');
/// Customer State
export const getCustomerState = createSelector(getOrderModuleState, state => state.customer);
export const getcustomers = createSelector(getCustomerState, fromCustomerReducer.getCustomers);
export const gettotalCustomerRecords = createSelector(getCustomerState, fromCustomerReducer.getTotalCustomerRecords);

/// Product State
export const getProductState = createSelector(getOrderModuleState, state => state.product);
export const getProducts = createSelector(getProductState, fromProductReducer.getProducts);
export const gettotalProductRecords = createSelector(getProductState, fromProductReducer.getTotalProductRecords);
