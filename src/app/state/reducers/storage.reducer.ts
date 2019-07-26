import * as storageActions from './../actions/storage.actions';

export interface State {
	localStore: Map<string, any>;
}

const initialState: State = {
	localStore: new Map<string, any>([])
};

export function storageReducer(state = initialState, action: storageActions.Actions): State {
	switch (action.type) {
		case storageActions.StorageActionTypes.LoadComplete: {
			return {
				...state,
				localStore: action.payload
			};
		}
		case storageActions.StorageActionTypes.UpdateStorageComplete: {
			return {
				...state,
				localStore: action.payload
			};
		}
		default:
			return state;
	}
}

export const getLocalStore = (state: State) => state.localStore;
