import { Action } from '@ngrx/store';
import { ProductList } from '../../models/product-list';
import { GetProducts } from '../../models/get-products';
import { Product } from '../../models/product';
import { ProductBestSeller } from '../../models/product-best-seller';

export enum ProductActionTypes {
    LoadProducts = '[Product] Load Products',
    LoadProductsComplete = '[Product] Load Products Complete',
    OnError = '[Product] On Error',
    AddProduct = '[Product] Add Product',
    AddProductComplete = '[Product] Add Product Complete',
    DeleteProduct = '[Product] Delete Product',
    DeleteProductComplete = '[Product] Delete Product Complete',
    GetProductById = '[Product] Get Products By Id',
    GetProductByIdComplete = '[Product] Get Products By Id Complete',
    UpdateProduct = '[Product] Update Product',
    UpdateProductComplete = '[Product] Update Product Complete',
    GetBestSellers = '[Product] Get Best Sellers',
    GetBestSellersComplete = '[Product] Get Best Sellers Complete'
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
export class AddProduct implements Action {
    readonly type = ProductActionTypes.AddProduct;
    constructor(public request: Product) { }
}
export class AddProductComplete implements Action {
    readonly type = ProductActionTypes.AddProductComplete;
    constructor() { }
}
export class DeleteProduct implements Action {
    readonly type = ProductActionTypes.DeleteProduct;
    constructor(public projectId: number) { }
}
export class DeleteProductComplete implements Action {
    readonly type = ProductActionTypes.DeleteProductComplete;
    constructor() { }
}
export class GetProductById implements Action {
    readonly type = ProductActionTypes.GetProductById;
    constructor(public productId: number) { }
}
export class GetProductByIdComplete implements Action {
    readonly type = ProductActionTypes.GetProductByIdComplete;
    constructor(public payload: Product) { }
}
export class UpdateProduct implements Action {
    readonly type = ProductActionTypes.UpdateProduct;
    constructor(public request: Product) { }
}
export class UpdateProductComplete implements Action {
    readonly type = ProductActionTypes.UpdateProductComplete;
    constructor() { }
}
export class GetBestSellers implements Action {
    readonly type = ProductActionTypes.GetBestSellers;
    constructor() { }
}
export class GetBestSellersComplete implements Action {
    readonly type = ProductActionTypes.GetBestSellersComplete;
    constructor(public payload: ProductBestSeller[]) { }
}
export type Actions =
    | LoadProducts
    | LoadProductsComplete
    | OnError
    | AddProduct
    | AddProductComplete
    | DeleteProduct
    | DeleteProductComplete
    | GetProductById
    | GetProductByIdComplete
    | UpdateProduct
    | UpdateProductComplete
    | GetBestSellers
    | GetBestSellersComplete;
