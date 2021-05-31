import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./auth/auth.guard";
import {HomeComponent} from "./pages/home.component";
import {PageNotFoundComponent} from "./pages/page-not-found.component";


const routes:Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},

  {path: 'people', loadChildren: () => import('./people/people.module').then(m => m.PeopleModule), canActivateChild: [AuthGuard]},

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
