import { Component, OnInit } from '@angular/core';
import { demoForm } from '../demoform';
console.log(demoForm);

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styles: [
    `
      :host {
        width: 80%;
        display: block;
        margin: 0 auto;
        margin-top: 50px;
        margin-bottom: 40px;
      }
      pre {
        background-color: white;
        padding: 30px;
        border: 1px solid #ccc;
      }
    `,
  ],
})
export class DemoComponent implements OnInit {

    public form=demoForm;
    public model={};

    constructor() {}

    ngOnInit() {}

    onFormSubmit(event: any) {

    }

    onChange(value) {
        console.log(value);
    }

    onChangeEvent(event: MouseEvent) {
        console.log(event, event.toString(), JSON.stringify(event));

    }

    onValueChange(value: boolean) {
        console.log(value);
    }
}
