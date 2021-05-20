import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from "./services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthService, private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);

      return false;
    }
    return true;
  }

}
