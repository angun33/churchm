import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError, filter, switchMap, take} from "rxjs/operators";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth:AuthService, private router:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = this.normalizeRequestHeaders(request);
    return next.handle(modifiedRequest).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401 && !request.url.includes('login'))
          return this.tryRefreshToken(modifiedRequest, next);
        else
          return throwError(error);
      })
    );
  }

  private normalizeRequestHeaders(request: HttpRequest<any>) {
    const token = this.auth.token;

    if (token) {
      return request.clone({
        withCredentials: true,
        headers: request.headers.has('Authorization') ?
          request.headers.set('Authorization', `Bearer ${token}`) :
          request.headers.append('Authorization', `Bearer ${token}`)
      });
    }
    return request.clone({withCredentials: true});
  }

  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private tryRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.refreshTokenInProgress) {
      this.refreshTokenInProgress = true;
      this.refreshTokenSubject.next(null);

      return this.auth.refresh().pipe(
        catchError(error => {
          this.refreshTokenInProgress = false;
          this.auth.logoutLocally();
          this.router.navigate(['/login']);
          return throwError(error);
        }),
        switchMap((token) => {
          this.refreshTokenInProgress = false;
          this.refreshTokenSubject.next(token);
          return next.handle(this.normalizeRequestHeaders(request));
        })
      );
    }
    else {
      return this.refreshTokenSubject.pipe(
        filter(authResult => authResult !== null),
        take(1),
        switchMap(() => {
          let modifiedRequest = this.normalizeRequestHeaders(request);
          return next.handle(modifiedRequest);
        }));
    }
  }
}
