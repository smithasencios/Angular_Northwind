import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad {

    constructor(private authService: AuthService, private router: Router) { }

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
        return this.checkLogin();
    }

    protected checkLogin(): boolean {
        let isAuthenticated = false; 
        this.authService.isAuthenticated.subscribe(value => {
            isAuthenticated = value;
        });
        if (!isAuthenticated) {
            alert('You must login to continue');
            this.router.navigate(['home']);
            return false;
        }
        return true;
    }
}