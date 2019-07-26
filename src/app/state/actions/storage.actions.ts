import { Action } from '@ngrx/store';

export enum StorageActionTypes {
    Load = '[Local Storage] Load',
    LoadComplete = '[Local Storage] Load complete',
    UpdateStorage = '[Local Storage] Update',
    UpdateStorageComplete = '[Local Storage] Update complete'
}

export class Load implements Action {
    readonly type = StorageActionTypes.Load;
    constructor() { }
}
export class LoadComplete implements Action {
    readonly type = StorageActionTypes.LoadComplete;
    constructor(public payload: Map<string, any>) { }
}
export class UpdateStorage implements Action {
    readonly type = StorageActionTypes.UpdateStorage;
    constructor(public key: string, public value: any) { }
}
export class UpdateStorageComplete implements Action {
    readonly type = StorageActionTypes.UpdateStorageComplete;
    constructor(public payload: Map<string, any>) { }
}
export type Actions = Load | LoadComplete | UpdateStorage | UpdateStorageComplete;
