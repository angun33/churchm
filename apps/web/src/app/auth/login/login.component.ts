import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'management-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm:FormGroup;

  constructor(private fb:FormBuilder,
              private auth:AuthService,
              private router:Router) {
    this.loginForm = fb.group({
      username: '',
      password: ''
    });
  }

  ngOnInit(): void {
    this.loginForm.enable();
  }

  login() {
    const {username, password} = this.loginForm.value;
    this.loginForm.disable();
    this.auth.login(username, password)
      .subscribe(() => this.router.navigate(['']))
    ;
  }
}
