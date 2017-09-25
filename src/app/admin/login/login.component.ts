import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../shared/services/user.service';
import { CookieService } from '../../shared/services/cookie.service';

import { User } from '../shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: User;
  loginFailed: boolean;

  constructor(
    private router: Router,
    private userService: UserService,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    this.model = new User();
  }

  public onSubmit() {
    this.login();
  }

  login() {

    this.userService.login(this.model)
      .subscribe(result => {
        if (result === true) {
          // login successful
          this.loginFailed = false;
          this.cookieService.put('user', String(this.model));
          this.router.navigate(['/cooking/main']);
        } else {
          // login failed
          this.loginFailed = true;
        }
      }, error => {
        this.loginFailed = true;
      });
  }

  loginAsGuest() {
    // login successful
    this.router.navigate(['/cooking/main']);
  }

}
