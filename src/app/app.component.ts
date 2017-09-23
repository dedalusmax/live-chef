import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Live Chef';
  username = 'Username';
  password = 'Password';
  login = 'Login';
  signup = 'Sign up';
  subtitle = "Let's cook";
  guest = "Let's just take a look"
}
