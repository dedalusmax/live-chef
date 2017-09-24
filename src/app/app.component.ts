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
  subtitle = 'Cooking makes simple';
  guest = 'Take a look';
}
