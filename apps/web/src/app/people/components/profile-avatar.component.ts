import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {isEmptyString} from "../../utils/checks.utils";

@Component({
  selector: 'profile-avatar',
  templateUrl: 'profile-avatar.component.html',
  styleUrls: ['profile-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileAvatarComponent {
  @Input() image;
  @Input() set name(name:string) {
    if (!isEmptyString(name))
      this._createInitials(name)
  }

  public initials;
  public color;

  private colors = [
    '#eb7181',
    '#ffd558',
    '#e38c49',
    '#3670b2',
    '#468547',
  ];

  constructor() {}

  private _createInitials(name) {
    this.initials = name
      .split(/\s+/)
      .reduce((initials, str) => initials += str[0].toUpperCase(), '')
      .slice(0,3);

    this.color = this.colors[
      this.initials.split('').reduce((t, c) => t += c.charCodeAt(0), 0) % this.colors.length
    ];
  }
}
