import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import * as fromReducer from './../../state/reducers/index';
import { Store } from '@ngrx/store';
import * as storageActions from './../../state/actions/storage.actions';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

    isAuthenticated = false;

    public localStoreItems$: Observable<Map<string, any>>;

    constructor(private authenticationService: AuthenticationService,
        private router: Router,
        private store: Store<fromReducer.State>) {

        // this.authenticationService.isAuthenticated.subscribe(value => {
        //     this.isAuthenticated = value;
        // });
    }

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {

        return this.authenticationService.isAuthenticated$.pipe(
            tap(loggedIn => {
                if (!loggedIn) {
                    alert('You must login to continue');
                    this.router.navigate(['home']);
                }
            })
        );
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.checkPermissions(next);
    }

    protected checkPermissions(route?: ActivatedRouteSnapshot): boolean {
        const expectedRole = route.data.expectedPermission;
        console.log(expectedRole)
        return true;
    }
}