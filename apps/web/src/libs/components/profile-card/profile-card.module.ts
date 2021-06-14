import {CommonModule} from "@angular/common";
import {NgModule} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {ProfileAvatarComponent} from "@web-libs/components/profile-card/profile-avatar.component";

import {ProfileCardComponent} from './profile-card.component';

@NgModule({
  imports: [
    MatCardModule,
    CommonModule,
  ],
  exports: [
    ProfileCardComponent,
    ProfileAvatarComponent
  ],
  declarations: [
    ProfileCardComponent,
    ProfileAvatarComponent
  ],
  providers: [],
})
export class ProfileCardModule {
}


