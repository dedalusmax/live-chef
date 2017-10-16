# Angular 4 Crash Course (Angular CLI)

This session is aiming to demonstrate the ease of development of Angular 4 application from scratch. Based on the LiveChefService project (an RTC app written in Knockout 3).

## Step 1: getting the project ready

```bash
npm install -g @angular/cli

cd (root)
ng new live-chef1 --minimal --routing --style scss --skip-git --skip-install -v
```

options: 
https://github.com/angular/angular-cli/wiki/new

- open Visual Studio Code
- browse to the project folder
- open integrated terminal:

```bash
npm install
ng serve
```
NOTE: installation usually takes approx. 1 min and 20 sec on a home wifi network.

## Step 2: copying styles and assets from the source project

- open file explorer, go to the source folder and copy all from Content/images into app/assets folder
- copy styles.scss from Content into app folder
- open styles.scss and change the path to the image to: ./~/assets/backgroundImage.jpg
- also, change -webkit-fill- to -webkit-stretch
- open index.html and change the icon path to: assets/small-logo.png
- show the app
- add dependencies for bootstrap inside the package.json:
```bash
    "bootstrap": "^3.3.7",
    "font-awesome": "^4.7.0",
    "jquery": "3.2.1"
```
- and add the links into the angular-cli.json:
```bash
    "../node_modules/bootstrap/dist/css/bootstrap.min.css",
    "../node_modules/font-awesome/css/font-awesome.css",
```
- execute ng serve
- show the app

## Step 3: preparing the app structure and adding admin module

- open angular-cli.json and change: defaults/component/inlineStyle to true, and inlineTemplate to true
- open app.component.ts and remove all the lines in inline template except for router-outlet
- open another terminal window:
```bash
ng g module admin --routing -m app
ng g component admin/login
```

- open app-routing.module.ts and add the route: { path: '', redirectTo: '/login', pathMatch: 'full' }
- open admin.module.ts and copy the import for LoginComponent  
- open admin-routing.module.ts, paste the import, and add the route: { path: 'login', component: LoginComponent }
- show the app

```bash
ng g class admin/shared/models/user
ng g service shared/services/web-api -m app
```
- copy the code from this project into the file!
- add references into app.module.ts

```bash
ng g service admin/shared/services/user -m admin
```
- open user.service.ts
- add imports for User and WebApiService
- add: private apiPath = 'http://localhost/LiveChefService/';
- add DI in constructor: private service: WebApiService
- add login method: loging(user: User) 
- add body inside: return this.service.save<User>(this.apiPath + '/login', user);
  
## Step 4: adding template and styles for a component

- browse to the KO project and find app/templates/login.html
- copy all the HTML into the login.component.html
- change the link of the chef.png to: ./assets/chef.png
- show the app
- change the bindings, from: data-bind="value: username" into [(ngModel)]="model.username"
- also for password field
- change button bindings, from: data-bind="click: loginUser" into (click)="loginUser()"
- also for guest field
- change visible binding to: *ngIf="error"
- change span into {{error}}
