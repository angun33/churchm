import {DragDropModule} from "@angular/cdk/drag-drop";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {inject, NgModule} from '@angular/core';
import {FlexLayoutModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTableModule} from "@angular/material/table";
import {RouterModule} from "@angular/router";
import {PaginatorPlugin} from "@datorama/akita";
import {AuthModule} from "../auth/auth.module";
import {DateInputModule} from "../common/common.module";
import {AppLayoutModule} from "../layout/layout.module";
import {ClassificationFormComponent} from "./classifications/components/classification-form.component";
import {ClassificationsOrderingComponent} from "./classifications/components/classifications-ordering.component";
import {ClassificationsPageComponent} from "./classifications/components/classifications-page.component";

import {PeopleListPageComponent} from './components/people-list-page.component';
import {PeopleListComponent} from "./components/people-list.component";
import {PersonFormPageComponent} from "./components/person-form-page.component";
import {PersonPageComponent} from "./components/person-page.component";
import {ProfileAvatarComponent} from "./components/profile-avatar.component";
import {ProfileCardComponent} from "./components/profile-card.component";
import {PeopleRoutingModule} from "./people-routing.module";
import {ClassificationsService} from "./classifications/services/classifications.service";
import {ClassificationsQuery} from "./classifications/services/classifications.query";
import {ClassificationsStore} from "./classifications/services/classifications.store";
import {PeopleQuery} from "./states/people.query";
import {PeopleService} from "./services/people.service";
import {PeopleStore} from "./states/people.store";

@NgModule({
  imports: [
    PeopleRoutingModule,
    AppLayoutModule,

    AuthModule,

    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatProgressBarModule,

    DragDropModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    DateInputModule,
  ],
  exports: [],
  declarations: [
    PeopleListPageComponent,
    PeopleListComponent,
    PersonFormPageComponent,
    PersonPageComponent,
    ProfileCardComponent,
    ProfileAvatarComponent,
    ClassificationsPageComponent,
    ClassificationFormComponent,
    ClassificationsOrderingComponent
  ],
  providers: [
    {
      provide: 'PEOPLE_PAGINATOR',
      useFactory: () => {
        const query = inject(PeopleQuery);
        return new PaginatorPlugin(query)
      }
    },
    PeopleStore,
    PeopleQuery,
    PeopleService,
    ClassificationsStore,
    ClassificationsQuery,
    ClassificationsService
  ],
})
export class PeopleModule {
}


