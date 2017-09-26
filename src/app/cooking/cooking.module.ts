import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CookingRoutingModule } from './cooking-routing.module';
import { MainComponent } from './main/main.component';
import { SignalrService } from './shared/services/signalr.service';

@NgModule({
  imports: [
    CommonModule,
    CookingRoutingModule
  ],
  declarations: [MainComponent],
  providers: [SignalrService]
})
export class CookingModule { }
