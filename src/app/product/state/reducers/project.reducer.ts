import * as projectActions from '../actions/product.actions';
import { Product } from '../../models/product';
import { ProductBestSeller } from '../../models/product-best-seller';

export interface State {
    products: Product[];
    totalRecords: number;
    product: Product;
    bestSellers: ProductBestSeller[];
}

const initialState: State = {
    products: [],
    totalRecords: 0,
    product: new Product(),
    bestSellers: []
};

export function ProductReducer(state = initialState, action: projectActions.Actions): State {
    switch (action.type) {
        case projectActions.ProductActionTypes.LoadProducts: {
            return state;
        }
        case projectActions.ProductActionTypes.LoadProductsComplete: {
            return {
                ...state,
                products: action.payload.data,
                totalRecords: action.payload.totalRecords
            };
        }
        case projectActions.ProductActionTypes.AddProduct: {
            return state;
        }
        case projectActions.ProductActionTypes.AddProductComplete: {
            return state;
        }
        case projectActions.ProductActionTypes.DeleteProduct: {
            return state;
        }
        case projectActions.ProductActionTypes.DeleteProductComplete: {
            return state;
        }
        case projectActions.ProductActionTypes.GetProductById: {
            return state;
        }
        case projectActions.ProductActionTypes.UpdateProduct: {
            return state;
        }
        case projectActions.ProductActionTypes.UpdateProductComplete: {
            return state;
        }
        case projectActions.ProductActionTypes.GetProductByIdComplete: {
            return {
                ...state,
                product: action.payload
            };
        }
        case projectActions.ProductActionTypes.GetBestSellers: {
            return state;
        }
        case projectActions.ProductActionTypes.GetBestSellersComplete: {
            return {
                ...state,
                bestSellers: action.payload
            };
        }
        default:
            return state;
    }
}
export const getProducts = (state: State) => state.products;
export const getProduct = (state: State) => state.product;
export const getTotalRecords = (state: State) => state.totalRecords;
export const getBestSellers = (state: State) => state.bestSellers;
