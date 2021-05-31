import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-layout',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'app-layout.component.html',
  styleUrls: ['app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {
  @Input() pageTitle:string
  @Input() pageDesc:string

  public authUser$;

  constructor(private auth:AuthService) {
    this.authUser$ = auth.user$;
  }

  ngOnInit() {
  }
}
