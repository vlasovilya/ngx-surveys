import { Component, OnInit, ViewChild } from '@angular/core';
import { demoForm } from '../demoform';
import { NgxSurveyComponent } from '../../lib/public_api'

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
      .submit-button {
        width:100%;
        margin-top:10px;
      }
    `,
  ],
})
export class DemoComponent implements OnInit {

    @ViewChild('survey', { static: false }) public survey:NgxSurveyComponent;

    public form=demoForm;
    public model={};

    constructor() {}

    ngOnInit() {}

    onFormSubmit(value) {
        console.log(value);
        alert (JSON.stringify(value, null, 2));
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
