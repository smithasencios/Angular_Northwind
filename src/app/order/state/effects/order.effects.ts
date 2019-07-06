import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as orderActions from '../actions/order.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { FrontendBaseEffect } from 'src/app/shared/frontend-base-effect';
import { OrderService } from '../../services/order.service';
import { SnackbarWrapperService } from 'src/app/shared/services/snackbar-wrapper-service';
import { Router } from '@angular/router';

@Injectable()
export class OrderEffects extends FrontendBaseEffect {
    constructor(private actions$: Actions, private orderService: OrderService,
        snackbarWrapperService: SnackbarWrapperService, private router: Router) {
        super(snackbarWrapperService);
    }

    @Effect()
    addOrder$ = this.actions$.pipe(
        ofType<orderActions.AddOrder>(orderActions.OrderActionTypes.AddOrder),
        switchMap(action => this.orderService.addOrder(action.request)
            .pipe(
                map(response => {
                    this.router.navigate(['/order']);
                    return new orderActions.AddOrderComplete(response);
                })
            ))
    );
}