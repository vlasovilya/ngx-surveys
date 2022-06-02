import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { demoForm } from '../demoform';
import { NgxSurveyComponent } from '../../../projects/ngx-surveys/src/public-api'
import { NgxSurveyService } from '../../../projects/ngx-surveys/src/lib/ngx-survey.service';
import { Subscription } from 'rxjs';

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
export class DemoComponent implements OnInit, OnDestroy {

    @ViewChild('survey', { static: false }) public survey:NgxSurveyComponent;

    public form=demoForm;
    public model={};
    private fileUpoadSubscription: Subscription;

    get submitDisabled(): boolean {
        return !!this.form.find(section=>section.items.some(item=>item.busy));
    }

    constructor(
        surveyService: NgxSurveyService
    ) {
        this.fileUpoadSubscription=surveyService.onFilesSelected.subscribe(files=>{
            files.forEach(file=>{
                let i=0;
                const interval=setInterval(()=>{
                    i++;
                    if (i>=100){
                        clearInterval(interval);
                        file.uploading=false;
                        file.url='https://cdn.pixabay.com/photo/2020/06/01/22/23/eye-5248678__340.jpg';
                    }
                    file.progressObserver.next(i);
                }, 30)

            })
        })
    }

    ngOnInit() {}

    ngOnDestroy(): void {
        this.fileUpoadSubscription.unsubscribe();
    }

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
