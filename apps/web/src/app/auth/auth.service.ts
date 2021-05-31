import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import jwtDecode from "jwt-decode";
import {BehaviorSubject, Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthService {
  private _userSubject:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _tokenSubject:BehaviorSubject<string> = new BehaviorSubject<string>(null);

  public readonly user$:Observable<any> = this._userSubject.asObservable();
  public readonly token$:Observable<string> = this._tokenSubject.asObservable();

  constructor(private http:HttpClient) {
  }

  get user() {
    return this._userSubject.getValue();
  }

  get token() {
    return this._tokenSubject.getValue();
  }

  login(username:string, password:string) {
    return this.http.post('http://localhost:3333/api/auth/login/', {username, password})
      .pipe(
        tap((data:any) => {
          const token = data.access_token;
          const user = jwtDecode(token);
          this._tokenSubject.next(token);
          this._userSubject.next(user);
        })
      );
  }

  logout() {
    this._tokenSubject.next(null);
    this._userSubject.next(null);
    return this.http.get('http://localhost:3333/api/auth/logout/');
  }

  logoutLocally() {
    this._tokenSubject.next(null);
    this._userSubject.next(null);
  }

  refresh() {
    return this.http.post('http://localhost:3333/api/auth/refresh-token/', {})
      .pipe(
        tap((data:any) => {
          const token = data.access_token;
          const user = jwtDecode(token);
          this._tokenSubject.next(token);
          this._userSubject.next(user);
        })
      )
  }

  isAuthenticated() {
    return this.token !== null;
  }
}
