import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError as observableThrowError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.handleAccess(req, next));
    }

    private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
        const authService = await this.authService.getAuth0Client();
        const token = await authService.getTokenSilently();

        let changedRequest = request;
        // HttpHeader object immutable - copy values
        const headerSettings: { [name: string]: string | string[]; } = {};

        for (const key of request.headers.keys()) {
            headerSettings[key] = request.headers.getAll(key);
        }
        if (token) {
            headerSettings['Authorization'] = 'Bearer ' + token;
        }
        headerSettings['Content-Type'] = 'application/json';
        const newHeader = new HttpHeaders(headerSettings);

        changedRequest = request.clone({
            headers: newHeader
        });

        return next.handle(changedRequest).pipe(
            catchError((err) => {
                console.log('no se pudo validar el token')
                if (err.status === 401) {
                    this.router.navigate(['/login'], {
                        queryParams: { redirectUrl: this.router.routerState.snapshot.url },
                    });
                }
                return observableThrowError(err);
            })).toPromise();
    }
}