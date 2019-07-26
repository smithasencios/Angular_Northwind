import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromLocalStorage from './storage.reducer';

export interface State { 
    localStorage: fromLocalStorage.State;
}
export const reducers: ActionReducerMap<State> = {
	localStorage: fromLocalStorage.storageReducer
};

export const getLocalStorageState = createFeatureSelector<fromLocalStorage.State>('localStorage');
export const getLocalStorage = createSelector(
	getLocalStorageState,
	fromLocalStorage.getLocalStore
);

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state: State, action: any): State {
        console.log('state', state);
        console.log('action', action);
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : [];