import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormItem, SurveyErrorStateMatcher, FormItemWidget } from '../index';

export class FormItemText extends FormItem {
    hint: string;
}

@Component({
  selector: 'ammo-form-item-text',
  templateUrl: './form-item-text.component.html',
  styleUrls: ['./form-item-text.component.scss']
})
export class FormItemTextComponent implements FormItemWidget, OnInit {

    @Input() item: FormItemText;
    @Input() editable: boolean=true;
    @Output() changes = new EventEmitter<FormItemText>();
    matcher = new SurveyErrorStateMatcher();
    maxLabelLength=60;

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
