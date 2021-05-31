import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";

import {DateInputComponent} from './components/date-input.component';
import {InputMaskDirective} from "./directives/mask.directive";

@NgModule({
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,

    ReactiveFormsModule,
  ],
  exports: [
    DateInputComponent,
    InputMaskDirective
  ],
  declarations: [
    DateInputComponent,
    InputMaskDirective
  ],
  providers: [],
})
export class DateInputModule {
}


