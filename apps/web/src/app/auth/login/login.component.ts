import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'management-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm:FormGroup;
  public isLoadingSession = false;

  private subscriptions:Subscription = new Subscription();
  private redirectTo:string;

  constructor(private fb:FormBuilder,
              private auth:AuthService,
              private route:ActivatedRoute,
              private router:Router) {
    this.loginForm = fb.group({
      username: '',
      password: ''
    });
  }

  ngOnInit(): void {
    // Try to refresh token, to initiate session.
    this.isLoadingSession = true;
    this.subscriptions.add(
      this.auth.refresh().subscribe(
        () => this.redirect(),
        () => this.isLoadingSession = false
      )
    );

    this.subscriptions.add(
      this.route.params.subscribe(({redirectTo}) => this.redirectTo = redirectTo)
    );

    this.loginForm.enable();
    this.loginForm.reset();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  login() {
    const {username, password} = this.loginForm.value;
    this.loginForm.disable();
    this.auth.login(username, password)
      .subscribe(
        () => this.redirect(),
        () => {
          this.loginForm.enable();
          this.loginForm.setErrors({invalid: true});
        }
      );
  }

  redirect() {
    this.router.navigate([this.redirectTo ?? ''])
  }
}
