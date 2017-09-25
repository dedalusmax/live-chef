import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: User;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

    this.model = new User();
  }

  public onSubmit() {
    this.login();
  }

  login() {
    // login successful
    this.router.navigate(['/cooking/main']);
  }

  loginAsGuest() {
    // login successful
    this.router.navigate(['/cooking/main']);
  }

}
