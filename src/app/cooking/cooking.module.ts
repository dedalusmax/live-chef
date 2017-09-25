import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CookingRoutingModule } from './cooking-routing.module';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,
    CookingRoutingModule
  ],
  declarations: [MainComponent]
})
export class CookingModule { }
