import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Person} from "../../../app/people/states/people.store";

@Component({
  selector: 'profile-card',
  templateUrl: 'profile-card.component.html',
  styleUrls: ['profile-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileCardComponent {
  @Input() person:Person;

  constructor() {}
}
