import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Cooking } from '../models/cooking';

let $: any;

@Injectable()
export class SignalrService {

  private hub = $.connection.chefHub;

  updateCookings: Observable<Array<Cooking>>;
  
  constructor() {

    this.hub.client.cookingAdded = function (cooking) {
      console.log('New cooking added: ' + cooking.DishName);
    };

    this.hub.client.userLoggedIn = function (user) {
      console.log('User logged-in: ' + user.Username);
    };

    $.connection.hub.start().done(function () {
    });
  }

  addCooking(data) {
    this.hub.server.addCooking(data);
  }

}
