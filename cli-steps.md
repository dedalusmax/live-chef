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

## Step 3: preparing the app structure and adding admin module

- open angular-cli.json and change: defaults/component/inlineStyle to true, and inlineTemplate to true
- open app.component.ts and remove all the lines in inline template except for router-outlet
- open another terminal window:
```bash
ng g module admin --routing -m app
ng g component admin/login
```



