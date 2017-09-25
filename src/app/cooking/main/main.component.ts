import { Component, OnInit } from '@angular/core';

import { Cooking } from '../shared/models/cooking';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  model: Cooking;
  items: Array<Cooking>;

  constructor(
    // private cookingService: CookingService,
  ) { }

  ngOnInit() {
    this.model = new Cooking();
    this.items = new Array();

    this.items.push({ DishName: 'Pasta', Id: 1, Status: 'Started', Username: 'Pero' });
    this.items.push({ DishName: 'BBQ Sauce', Id: 2, Status: 'NeedHelp', Username: 'Štef' });
    this.items.push({ DishName: 'Bolognese', Id: 3, Status: 'Ongoing', Username: 'Josip' });
    this.items.push({ DishName: 'Baked potatoes', Id: 4, Status: 'NeedHelp', Username: 'Barica' });

  }

  getData() {
    //  this.cookingService.getCooking()
    //    .subscribe((cooking: Array<Cooking>) => {
    //     this.items = cooking;
    //   },
    //   error => {
    //   });
  }
}
