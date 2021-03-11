import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormItem, SurveyErrorStateMatcher, FormItemWidget } from '../index';

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

    constructor() { }

    ngOnInit() {
        this.matcher.item=this.item;
    }

    ngOnChanges() {
        this.matcher.item=this.item;
    }

    checkRequired(placeholder) {
        if (placeholder === 'Required') {
            return true;
        }
    }

    onValueChanges(item) {
        this.changes.emit(item);
    }

}
