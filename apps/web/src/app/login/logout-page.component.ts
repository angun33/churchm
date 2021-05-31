import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'logout-page',
  template: ``
})
export class LogoutPageComponent implements OnInit {
  constructor(private auth:AuthService, private router:Router) {}

  ngOnInit() {
    this.auth.logout()
        .subscribe(() => this.router.navigate(['']));
  }
}
