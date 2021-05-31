import {CommonModule} from "@angular/common";
import {NgModule} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterModule} from "@angular/router";

import {AppLayoutComponent} from './components/app-layout.component';
import {PageActions} from "./components/page-actions.directive";
import {PageMenuComponent} from "./components/page-menu.component";

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,

    CommonModule,
    RouterModule,
  ],
  exports: [
    AppLayoutComponent,
    PageMenuComponent,
    PageActions,

    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  declarations: [
    AppLayoutComponent,
    PageMenuComponent,
    PageActions
  ],
  providers: [],
})
export class AppLayoutModule {
}


