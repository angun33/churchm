import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./auth/auth.guard";
import {HomeComponent} from "./pages/home.component";
import {PageNotFoundComponent} from "./pages/page-not-found.component";


const routes:Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},

  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'login', redirectTo: '/auth/login/', pathMatch: 'full'},
  {path: 'logout', redirectTo: '/auth/logout/', pathMatch: 'full'},

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
