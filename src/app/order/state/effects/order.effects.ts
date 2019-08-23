import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as orderActions from '../actions/order.actions';
import { switchMap, map, withLatestFrom, catchError } from 'rxjs/operators';
import { FrontendBaseEffect } from 'src/app/shared/frontend-base-effect';
import { OrderService } from '../../services/order.service';
import { SnackbarWrapperService } from 'src/app/shared/services/snackbar-wrapper-service';
import { Router } from '@angular/router';
import * as fromRoot from './../reducers';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrderErrorsComponent } from '../../components/order-errors/order-errors.component';

@Injectable()
export class OrderEffects extends FrontendBaseEffect {
    constructor(private actions$: Actions, private orderService: OrderService,
        snackbarWrapperService: SnackbarWrapperService, private router: Router,
        private store: Store<fromRoot.OrderState>,
        private db: AngularFirestore) {
        super(snackbarWrapperService);
    }

    @Effect()
    getOrders$ = this.actions$.pipe(
        ofType<orderActions.LoadOrders>(orderActions.OrderActionTypes.LoadOrders),
        withLatestFrom(this.store.select(fromRoot.getQuery)),
        switchMap(([action, query]) => {
            let orderRequest = action.request;

            orderRequest.Status = query.status !== undefined ? query.status : null;
            orderRequest.Date_From = query.date_from ? moment(query.date_from).format("YYYY/MM/DD") : null;
            orderRequest.Date_To = query.date_to ? moment(query.date_to).format("YYYY/MM/DD") : null;

            return this.orderService.getOrders(orderRequest)
                .pipe(
                    map(data => new orderActions.LoadOrdersComplete(data)),
                    catchError((errorResponse: any) => {
                        return this.handleError(new orderActions.OnError(), errorResponse, OrderErrorsComponent);
                    })
                )
        }
        )
    );

    @Effect()
    addOrder$ = this.actions$.pipe(
        ofType<orderActions.AddOrder>(orderActions.OrderActionTypes.AddOrder),
        switchMap(action => this.orderService.addOrder(action.request)
            .pipe(
                map(response => {
                    this.router.navigate(['/order']);

                    this.db.collection('orders').add({
                        created_date: moment(new Date()).format("YYYY/MM/DD"),
                        order_id: response
                    });
                    // .then(function(docRef) {
                    //     console.log("Document written with ID: ", docRef.id);
                    // })
                    // .catch(function(error) {
                    //     console.error("Error adding document: ", error);
                    // });
                    return new orderActions.AddOrderComplete(response);
                }),
                catchError((errorResponse: any) => {
					return this.handleError(new orderActions.OnError(), errorResponse, OrderErrorsComponent);
				})
            ))
    );

    @Effect()
    getOrdersById$ = this.actions$.pipe(
        ofType<orderActions.LoadOrderById>(orderActions.OrderActionTypes.LoadOrderById),
        switchMap(action => this.orderService.getOrderById(action.orderId)
            .pipe(
                map(data => new orderActions.LoadOrderByIdComplete(data)),
                catchError((errorResponse: any) => {
					return this.handleError(new orderActions.OnError(), errorResponse, OrderErrorsComponent);
				})
            ))
    );

    @Effect()
    updateOrder$ = this.actions$.pipe(
        ofType<orderActions.UpdateOrder>(orderActions.OrderActionTypes.UpdateOrder),
        switchMap(action => this.orderService.updateOrder(action.request)
            .pipe(
                map(_ => {
                    this.router.navigate(['/order']);
                    return new orderActions.UpdateOrderComplete();
                }),
                catchError((errorResponse: any) => {
					return this.handleError(new orderActions.OnError(), errorResponse, OrderErrorsComponent);
				})
            ))
    );
}