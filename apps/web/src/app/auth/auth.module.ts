import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthGuard} from "./auth.guard";
import {AuthInterceptor} from "./auth.interceptor";
import {LoginComponent} from "./login/login.component";
import {AuthService} from "./services/auth.service";

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    AuthGuard
  ],
  declarations: [
    LoginComponent
  ],
  imports: [
    MatInputModule,
    MatButtonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ]
})
export class AuthModule { }