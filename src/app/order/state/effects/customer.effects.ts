import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as customerActions from '../actions/customer.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { FrontendBaseEffect } from 'src/app/shared/frontend-base-effect';
import { CustomerService } from '../../services/customer.service';
import { SnackbarWrapperService } from 'src/app/shared/services/snackbar-wrapper-service';

@Injectable()
export class CustomerEffects extends FrontendBaseEffect {
    constructor(private actions$: Actions, private customerService: CustomerService, snackbarWrapperService: SnackbarWrapperService) {
        super(snackbarWrapperService);
    }

    @Effect()
    getCustomers$ = this.actions$.pipe(
        ofType<customerActions.LoadCustomers>(customerActions.CustomerActionTypes.LoadCustomers),
        switchMap(action => this.customerService.getCustomers(action.request)
            .pipe(
                map(data => new customerActions.LoadCustomersComplete(data))
            ))
    );
}