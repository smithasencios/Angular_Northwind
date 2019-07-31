import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError as observableThrowError, from, throwError } from 'rxjs';
import { catchError, filter, mergeMap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authenticationService.accessToken$.pipe(
      filter(token => typeof token === 'string'),
      mergeMap(token => {
        const tokenReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(tokenReq);
      }),
      catchError(err => {
        if (err.status === 401) {
          this.router.navigate(['/home']);
        }
        return observableThrowError(err);
      })
    );
  }
}