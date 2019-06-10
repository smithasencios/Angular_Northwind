import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { FrontendBaseEffect } from 'src/app/shared/frontend-base-effect';
import { ProductService } from '../../services/product.service';
import { SnackbarWrapperService } from 'src/app/shared/services/snackbar-wrapper-service';
import * as productActions from '../actions/product.actions';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class ProductEffects extends FrontendBaseEffect {
    constructor(private actions$: Actions, private productService: ProductService, snackbarWrapperService: SnackbarWrapperService) {
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
}