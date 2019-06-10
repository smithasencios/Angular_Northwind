import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as productActions from '../actions/product.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { FrontendBaseEffect } from 'src/app/shared/frontend-base-effect';
import { SnackbarWrapperService } from 'src/app/shared/services/snackbar-wrapper-service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Injectable()
export class ProductEffects extends FrontendBaseEffect {
    constructor(private actions$: Actions, private productService: ProductService, snackbarWrapperService: SnackbarWrapperService,
                private router: Router) {
        super(snackbarWrapperService);
    }

    @Effect()
    getProducts$ = this.actions$.pipe(
        ofType<productActions.LoadProducts>(productActions.ProductActionTypes.LoadProducts),
        switchMap(action => this.productService.getProducts(action.request)
            .pipe(
                map(data => new productActions.LoadProductsComplete(data))
            ))
    );
    @Effect()
    addProduct$ = this.actions$.pipe(
        ofType<productActions.AddProduct>(productActions.ProductActionTypes.AddProduct),
        switchMap(action => this.productService.addProduct(action.request)
            .pipe(
                map(_ => {
                    this.router.navigate(['/product/list']);
                    return new productActions.AddProductComplete();
                })
            ))
    );
    @Effect()
    deleteProduct$ = this.actions$.pipe(
        ofType<productActions.DeleteProduct>(productActions.ProductActionTypes.DeleteProduct),
        switchMap(action => this.productService.deleteProduct(action.projectId)
            .pipe(
                map(_ => {
                    return new productActions.DeleteProductComplete();
                })
            ))
    );
    @Effect()
    getProductById$ = this.actions$.pipe(
        ofType<productActions.GetProductById>(productActions.ProductActionTypes.GetProductById),
        switchMap(action => this.productService.getProductById(action.productId)
            .pipe(
                map(data => new productActions.GetProductByIdComplete(data))
            ))
    );
    @Effect()
    updateProduct$ = this.actions$.pipe(
        ofType<productActions.UpdateProduct>(productActions.ProductActionTypes.UpdateProduct),
        switchMap(action => this.productService.updateProduct(action.request)
            .pipe(
                map(_ => {
                    this.router.navigate(['/product/list']);
                    return new productActions.UpdateProductComplete();
                })
            ))
    );
    @Effect()
    getBestSellers$ = this.actions$.pipe(
        ofType<productActions.GetBestSellers>(productActions.ProductActionTypes.GetBestSellers),
        switchMap(action => this.productService.getBestSellers()
            .pipe(
                map(data => new productActions.GetBestSellersComplete(data))
            ))
    );
}
