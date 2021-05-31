import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginPageComponent} from "./login-page.component";
import {LogoutPageComponent} from "./logout-page.component";

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'logout', component: LogoutPageComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class LoginRoutingModule { }
