import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ClassificationsPageComponent} from "./classifications/components/classifications-page.component";
import {PersonFormPageComponent} from "./components/person-form-page.component";
import {PeopleListPageComponent} from "./components/people-list-page.component";
import {PersonPageComponent} from "./components/person-page.component";


const routes: Routes = [
  { path: '', component: PeopleListPageComponent },
  { path: 'new', component: PersonFormPageComponent },
  { path: 'edit/:id', component: PersonFormPageComponent },
  { path: 'classifications', component: ClassificationsPageComponent },
  { path: ':id', component: PersonPageComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class PeopleRoutingModule {
}
