import {HttpClientModule} from "@angular/common/http";
import {NgModule} from '@angular/core';
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NG_ENTITY_SERVICE_CONFIG, NgEntityServiceGlobalConfig} from '@datorama/akita-ng-entity-service';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';
import {environment} from '../environments/environment';
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from './app.component';
import {AuthModule} from "./auth/auth.module";
import {AppLayoutModule} from "./layout/layout.module";
import {HomeComponent} from './pages/home.component';
import {PageNotFoundComponent} from './pages/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    AuthModule,
    AppRoutingModule,
    AppLayoutModule,

    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
  ],
  providers: [
    { provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'http://localhost:3333/api' } as NgEntityServiceGlobalConfig },
    { provide: MAT_DATE_LOCALE, useValue: 'en-AU'},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
