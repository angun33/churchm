import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {InputMaskModule} from "@web-libs/directives/input-mask/input-mask.module";

import {DateInputComponent} from './date-input.component';

@NgModule({
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,

    ReactiveFormsModule,

    InputMaskModule
  ],
  exports: [ DateInputComponent ],
  declarations: [ DateInputComponent ],
})
export class DateInputModule {}
