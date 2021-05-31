import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

export interface PageMenu {
  title: string,
  link: string,
  options?: {
    activeClass?: string;
    exact?: boolean
  }
}

@Component({
  selector: 'page-menu',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'page-menu.component.html',
  host: { class: 'page-menu' }
})
export class PageMenuComponent {
  @Input() menus:PageMenu[] = [];
  constructor() {}
}
