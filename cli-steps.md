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
ng new live-chef --minimal --routing --style scss --skip-git --skip-install -v
cd live-chef
npm install
```
options: 
https://github.com/angular/angular-cli/wiki/new

NOTE: installation usually takes approx. 1 min (for CLI) and 1 min and 20 sec (for new project) on a home wifi network.

> switch to the presentation slides (with a keen eye to the installation process!)

```bash
ng serve
```
NOTE: installation usually takes approx. 1 min and 20 sec on a home wifi network.

> switch to the presentation slides and explain about Angular CLI

- *open folder* in VS code 
- explain the project structure and the configuration
- open **angular-cli.json** and change: *defaults/component/inlineStyle* to true, and *inlineTemplate* to true

## Step 2: copying styles and assets from the source project

Explain what the intentions are, show the live chef and what we want to do.

- open file explorer, go to the source folder and copy all from **Content/images** into **app/assets** folder
- copy **styles.scss** from **Content** into **app** folder
- stop the LiveChefService
- change the paths inside *Service/Repositories/RecipeRepository.cs* from **Content/images** to **assets** 
- rebuild the project

### changes in the styles.scss:

- find the path to the image and change it to: ./~/assets/backgroundImage.jpg
- change -webkit-fill- to -webkit-stretch

### changes in the index.html:

- change the icon path to: assets/small-logo.png

show the app

### changes in the package.json:

- add dependencies for bootstrap:
```json
    "bootstrap": "^3.3.7",
    "font-awesome": "^4.7.0",
    "jquery": "3.2.1"
```

### add the links into the angular-cli.json:

```style
    "../node_modules/bootstrap/dist/css/bootstrap.min.css",
    "../node_modules/font-awesome/css/font-awesome.css",
```
in terminal:

```style
    (quit task)
    ng serve
```
- show the app

## Step 3: preparing the app structure and adding admin module

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
- add username and password fields into User class
- copy the code from this project into the file!
- add references into app.module.ts

```bash
ng g service admin/shared/services/user -m admin
```
### open user.service.ts:

- add imports for User and WebApiService
- add: private apiPath = 'http://localhost/LiveChefService/';
- add DI in constructor: private service: WebApiService
- add login method: loging(user: User) 
- add body inside: return this.service.save<User>(this.apiPath + '/login', user);
  
## Step 4: adding template and styles for a login component to work

- browse to the KO project and find app/templates/login.html
- copy all the HTML into the login.component.html

### changes in the login.component.html:

- change the link of the chef.png to: ./assets/chef.png
- show the app
- change the bindings, from: data-bind="value: username" into [(ngModel)]="model.username"
- also for password field
- change button bindings, from: data-bind="click: loginUser" into (click)="loginUser()"
- also for guest field
- change visible binding to: *ngIf="error"
- change span into {{error}}

### changes in the login.component.ts:

- import { FormsModule } from '@angular/forms';
- import UserService from the services
- add loginUser method:

this.userService.login(this.model).subscribe(result => {
      this.router.navigate(['/cooking']);
    }, error => {
      this.error = error._body;
    });
    
- add onSubmit method to call loginUser method

### changes in the app.module.ts:

- add: import { HttpModule, XHRBackend } from '@angular/http';
- add imports: HttpModule
- add provider: XHRBackend

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

