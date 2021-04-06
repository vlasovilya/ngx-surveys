import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormItem, SurveyErrorStateMatcher, FormItemWidget } from '../index';
import moment from "moment";

export class FormItemDate extends FormItem {

}

@Component({
  selector: 'ammo-form-item-date',
  templateUrl: './form-item-date.component.html',
  styleUrls: ['./form-item-date.component.scss']
})
export class FormItemDateComponent implements FormItemWidget, OnInit {

    @Input() item: FormItemDate;
    @Input() editable: boolean=true;
    @Output() changes = new EventEmitter<FormItemDate>();
    matcher = new SurveyErrorStateMatcher();
    public value: Object;

    constructor() { }

    ngOnInit() {
        this.matcher.item=this.item;
        if (this.item.value){
            this.value=moment(this.item.value.toString());
        }
        //console.log(this.value);
    }

    ngOnChanges() {
        this.matcher.item=this.item;
    }

    checkRequired(placeholder) {
        if (placeholder === 'Required') {
            return true;
        }
    }

    onValueChanges(ev) {
        const val=ev.value.format('L');
        this.item.value=val;
        this.changes.emit(this.item);
    }

}
