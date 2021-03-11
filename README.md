# Angular Surveys

## Description

Angular survey / form builder for [Angular](https://angular.io).

Live [demo](https://vlasovilya.github.io/ngx-surveys/demo/)

A [stackblitz](https://stackblitz.com) is also available [here](https://stackblitz.com/edit/ngx-surveys)

Inspired by Google Forms and [angular-surveys](https://github.com/mwasiluk/angular-surveys) for AngularJS.

## Installation

npm: `npm install ngx-surveys --save`

yarn: `yarn add ngx-surveys`

## Usage

- Import into a module (`AppModule` example below)

```javascript
// app.module.ts
import { NgxSurveyModule } from 'ngx-surveys';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, NgxSurveyModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

# Form

```html
<ngx-survey
    [form]="form"
    [(value)]="model"
    (submit)="onFormSubmit($event)"
>
</ngx-survey>

```

# Form Builder

```html
<ngx-survey-form-builder
    [form]="form"
    (changes)="onChange($event)"
>
</ngx-survey-form-builder>

```

## Development

### Setup

```sh
yarn install
```

### Demo

Edit files in `src/app` to add to the demo or try changes to the library.

### Build library

*First, edit version in `package.json` and `src/lib/package.json` to publish a new version to npmjs.org*

```sh
# Build the library into dist/{es5,es2015}
yarn build
# Publish to npm
yarn release
```
