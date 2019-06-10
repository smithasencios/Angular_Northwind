import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProductReducer from '../reducers/project.reducer';

export interface ProductState {
    product: fromProductReducer.State;
}
export const reducers: ActionReducerMap<ProductState> = {
    product: fromProductReducer.ProductReducer
};

export const getProductModuleState = createFeatureSelector<ProductState>('product');
export const getProductState = createSelector(getProductModuleState, state => state.product);
export const getProducts = createSelector(getProductState, fromProductReducer.getProducts);
export const gettotalRecords = createSelector(getProductState, fromProductReducer.getTotalRecords);
export const getProduct = createSelector(getProductState, fromProductReducer.getProduct);
export const getBestSellers = createSelector(getProductState, fromProductReducer.getBestSellers);