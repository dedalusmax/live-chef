# Angular 4 Crash Course (Angular CLI)

This session is aiming to demonstrate the ease of development of Angular 4 application from scratch. Based on the LiveChefService project (an RTC app written in Knockout 3).

### Preparation 
> open Visual Studio 2017. open LiveChefService project. build it. start the app and minimize it.

## Step 1: getting the project ready

- open **Visual Studio Code**
- open *integrated terminal*
- only **explain** that CLI needs to be installed, other lines execute:

```bash
npm install -g @angular/cli
d:
ng new live-chef1 --minimal --routing --style scss --skip-git -v
```

NOTE: installation usually takes approx. 1 min (for CLI) and 1 min and 20 sec (for new project) on a home wifi network.

> switch to the presentation slides (with a keen eye to the installation process!)

```bash
cd live-chef1
ng serve
```
- explain the effects of building the project
- browse to the http://localhost:4200

> switch to the presentation slides and explain about Angular CLI

- open folder in VS code 
- explain the project structure and the configuration
- open **angular-cli.json** and change: *defaults/component/inlineStyle* to true, and *inlineTemplate* to true

## Step 2: copying styles and assets from the source project

Explain what the intentions are, show the live chef and what we want to do.

- open file explorer, go to the source folder and copy all from **Content/images** into **app/assets** folder
- open **styles.scss** from **Content** and copy all into *styles.scss* inside the **app** folder
- explain it is not a good idea and why
- make changes in the **styles.scss**: find the path to the image and remove one dot
- show the app
- explain why it doesn't show yet anything usefull

### add dependencies for bootstrap in the package.json:

```json
    "bootstrap": "^3.3.7",
    "font-awesome": "^4.7.0",
    "jquery": "3.2.1"
```
- quit the terminal job

```bash
    npm install
```

### add the links to the styles into the angular-cli.json:

```style
    "../node_modules/bootstrap/dist/css/bootstrap.min.css",
    "../node_modules/font-awesome/css/font-awesome.css",
```
in terminal:

```bash
    ng serve
```
- show the app

## Step 3: preparing the app structure and adding admin module and services

- open **app.component.ts** and remove all the lines in inline template except for router-outlet
- show the app to demo automatic update in browser
- open another terminal window:
```bash
ng g module admin --routing -m app
ng g component admin/login
```

- open **app-routing.module.ts** and add the route: 
```typescript
{ path: '', redirectTo: '/login', pathMatch: 'full' }
```
- open **admin.module.ts** and copy the import for LoginComponent  
- open **admin-routing.module.ts**, paste the import, and add the route: { path: 'login', component: LoginComponent }
- show the app

```bash
ng g class admin/shared/models/user
ng g service admin/shared/services/user -m admin
ng g service shared/services/web-api -m app
```
- add *username* and *password* fields into the **user.ts** model

### implement web-api.service.ts:

take the code from the following address:
https://github.com/dedalusmax/live-chef

```typescript
import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class WebApiService extends Http {

  constructor(backend: XHRBackend, options: RequestOptions) {
    super(backend, options);
  }

  getList(apiPath: string) {
    return super.get(apiPath)
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: any) => {
        return Observable.throw(error);
      });
  }

  getById(apiPath: string, id: number) {
    return super.get(apiPath + '/' + id)
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: any) => {
        return Observable.throw(error);
      });
  }

  save<T>(apiPath: string, data: T) {
    return super.post(apiPath, data)
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: any) => {
        return Observable.throw(error);
      });
  }
}
```
### implement user.service.ts:

- open **app.module.ts** and copy the import to *WebApiService*
- fix path with ../../../ in the beginning of this import
- add imports for User and WebApiService
- add instance field, DI in the constructor and body inside: 

```typescript
  private apiPath = 'http://localhost/LiveChefService/api/user';

  constructor(private service: WebApiService) { }

  login(user: User) {
    return this.service.save(this.apiPath + '/login', user);
  }
```

### changes in the app.module.ts:

- add the following import for HTTP service to work: 
```typescript
  import { HttpModule, XHRBackend } from '@angular/http';
```
- add to the imports: HttpModule
- add to the provider: XHRBackend

## Step 4: adding template and styles for a login component to work

- browse to the KO project and find *app/templates/login.html*
- copy all the HTML into the **login.component.html**

### changes in the login.component.html:

- change the bindings, from: `data-bind="value: username"` into `[(ngModel)]="model.username"`
- also for password field
- change button bindings, from: `data-bind="click: loginUser"` into `(click)="loginUser()"`
- also for guest field
- change `data-bind="visible: error"` binding to `*ngIf="error"`
- change span binding into `{{error}}`

explain why it does not work and how to fix it.

### changes in the admin.module.ts:

```typescript
import { FormsModule } from '@angular/forms';
```

- add FormModule in the **imports** for module

### changes in the login.component.ts:

- open **admin.module.ts** and copy the import for UserService
- add import for **User** class model
- add DI for UserService in the **constructor**
- add instance fields for model and error 
- add **loginUser** method
- add **onSubmit** method to call the loginUser method, like this:

```typescript
  private model: User;
  private error: string;

  constructor(private service: UserService) { }

  ngOnInit() {
    this.model = new User();
  }

  loginUser() {
    this.service.login(this.model).subscribe(result => {
    }, error => this.error = error._body);
  }

  onSubmit() {
    this.loginUser();
  }
```

## Step 5: add router and navigation to a new cooking module

### changes in login.component.ts:

- import { Router } from '@angular/router';
- add DI for router
- in loginUser method: this.router.navigate(['/cooking/main']);

in terminal:
 
 ```bash
ng g module cooking --routing -m app
ng g component cooking/main
```

### cooking-routing.module.ts:

- add routing for cooking module: { path: 'cooking/main', component: MainComponent }
- show app, click on login
- explain children in navigation 

- copy HTML from the source project: templates/main.html into main.component.html
- explain navigation strategy 

in app-routing.module.ts:
- RouterModule.forRoot(routes, { useHash: true })

### create new model, service and component for live cooking and recipes:

 ```bash
ng g class cooking/shared/models/cooking
ng g class cooking/shared/models/recipe
ng g service cooking/shared/services/cooking -m cooking
ng g service cooking/shared/services/recipe -m cooking
ng g component cooking/live-cooking -m cooking
ng g component cooking/recipes -m cooking
```

in cooking-routing.module.ts:
- copy imports from cooking.module.ts for two newly added components
- add two child routes into children array: 
{ path: 'live-cooking', component: LiveCookingComponent },
  { path: 'recipes', component: RecipesComponent }

### in main.component.html:

- remove templates on the bottom, and insert: <router-outlet> tag
- remove data-bind on the top
- add router links instead of data-bind: routerLink="/cooking/live-cooking" routerLinkActive="active"
- also the second one, others remove

### copy the html to show some data:

- from the cookings-list.html into live-cooking.component.html
- from the recipes-list.html into recipes.component.html
- from the cooking-card.html into live-cooking.component.html (instead of template)
- from the recipe-card.html into recipes.component.html (instead of template)

### add some data inside:

### in cooking.service.ts:

- copy the code from user.service.ts
- change apiPath to 'cooking'
- create getCookings method as getList

### do the same with recipe.service.ts:

- copy the code from cooking.service.ts
- change the apiPath to 'recipe'
- rename method to 'getRecipe'

### in live-cooking.component.ts: 

- add CookingService reference
- add Cooking reference
- add field: cookings = []
- add code into the ngOnInit method: this.service.getCookings().subscribe(result => this.cookings = result );
- explain about generics and type enforcement: Array<Cooking>
  
### in live-cooking.component.html:

- replace data-bind with: *ngFor="let cooking of cookings"
- replace textual bindings with interpolation: {{recipe.Name}}
- replace image bindings to [attr.scr]="recipe.Image" or "cooking.Dish.Image"

the same thing in recipes.component.html!

