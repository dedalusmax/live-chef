import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule, Http, RequestOptions, XHRBackend } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

// SERVICES:
import { AppSettings } from './app.settings';
import { WebApiService } from './shared/services/web-api.service';
import { CookieService } from './shared/services/cookie.service';

// COMPONENTS:
import { AppComponent } from './app.component';
import { CookingModule } from './cooking/cooking.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    CookingModule,
    AdminModule,
    HttpModule
  ],
  providers: [
    AppSettings,
    WebApiService,
    CookieService,
    XHRBackend
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
