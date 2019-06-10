import { Action } from '@ngrx/store';
import { GetProducts } from '../../models/get_products';
import { ProductList } from '../../models/product-list';

export enum ProductActionTypes {
    LoadProducts = '[Order-Product] Load Products',
    LoadProductsComplete = '[Order-Product] Load Products Complete',
    OnError = '[Order-Product] On Error'
}

export class OnError implements Action {
    readonly type = ProductActionTypes.OnError;
    constructor() { }
}

export class LoadProducts implements Action {
    readonly type = ProductActionTypes.LoadProducts;
    constructor(public request: GetProducts) { }
}
export class LoadProductsComplete implements Action {
    readonly type = ProductActionTypes.LoadProductsComplete;
    constructor(public payload: ProductList) { }
}

export type Actions =
    | OnError
    | LoadProducts
    | LoadProductsComplete;
