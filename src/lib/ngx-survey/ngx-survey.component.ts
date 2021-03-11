import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxSurveyService } from './ngx-survey.service';

@Component({
  selector: 'ngx-survey',
  templateUrl: './ngx-survey.component.html',
  styleUrls: ['./ngx-survey.component.scss']
})
export class NgxSurveyComponent implements OnInit {

    @Input() form:any[];
    @Input() value:any={};
    @Output() valueChange = new EventEmitter<any>();
    @Output() submit = new EventEmitter<any>();


    public editable:boolean=true;

    constructor(
        public service: NgxSurveyService,
    ) { }

    ngOnInit() {
        this.form=this.service.initForm(this.form, this.value);
    }

    scrollToField(field) {
        let el = document.getElementById('form_item_' + field.name);
        if (el){
            el.scrollIntoView();
        }
    };

    onItemChanges(item) {
        item.errors=this.service.getErrors(item);
        console.log(item);
        const formValue=this.service.getValue(this.form, false);
        console.log(formValue);
        this.valueChange.emit(formValue.value);
    }

    submitForm(){

        const {valid, value, firstError}=this.service.getValue(this.form, true);
        console.log(value, firstError);
        if (valid){
            this.submit.emit(value);
        }
        else {
            this.scrollToField(firstError);
        }



    }

}
