import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'logout-component',
  template: ``
})
export class LogoutComponent implements OnInit {
  constructor(private auth:AuthService, private router:Router) {}

  ngOnInit() {
    if (this.auth.isAuthenticated())
      this.auth.logout()
        .subscribe(() => this.router.navigate(['']));
    else
      this.router.navigate(['']);
  }
}
