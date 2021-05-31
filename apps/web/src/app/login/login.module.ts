import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";

import {LoginRoutingModule} from "./login-routing.module";
import {LoginPageComponent} from "./login-page.component";
import {LogoutPageComponent} from "./logout-page.component";

@NgModule({
  imports: [
    LoginRoutingModule,

    MatButtonModule,
    MatCardModule,
    MatInputModule,

    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [],
  declarations: [
    LoginPageComponent,
    LogoutPageComponent
  ],
  providers: [],
})
export class LoginModule {
}


