import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, Subject} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth:AuthService, private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this._isAuthenticated(state);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this._isAuthenticated(state);
  }

  private _isAuthenticated(state: RouterStateSnapshot) : Observable<boolean> | boolean {
    if (!this.auth.isAuthenticated()) {
      const subject = new Subject<boolean>();
      this.auth.refresh()
        .subscribe(
          () => subject.next(true),
          () => {
            this.router.navigate(['login', {'redirectTo': state.url}]);
            subject.next(false);
          }
        )
      return subject.asObservable();
    }
    return true;
  }
}
