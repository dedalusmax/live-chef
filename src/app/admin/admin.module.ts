import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';

// SERVICES:
import { UserService } from './shared/services/user.service';

// COMPONENTS:
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    UserService
]
})
export class AdminModule { }
