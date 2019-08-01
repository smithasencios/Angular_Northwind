import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import * as fromReducer from './../../state/reducers/index';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../state/reducers';
import { tap } from 'rxjs/operators';
import { Permission } from 'src/app/shared/models/permission';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

    localStoreItems$: Observable<Map<string, any>> = this.store.select(fromRoot.getLocalStorage);

    constructor(private authenticationService: AuthenticationService,
        private router: Router,
        private store: Store<fromReducer.State>) { }

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
        let hasPermissions: boolean = true;
        const expectedRole = route.data.expectedPermission;

        this.localStoreItems$
            .subscribe(items => {
                const permissions: Permission[] = items.get("permissions");
                if (permissions) {

                    hasPermissions = permissions.some((permission: Permission) => permission.permission_name === expectedRole);
                    if (!hasPermissions) {
                        this.router.navigate(['home']);
                    }
                }
            });


        return hasPermissions;
    }
}