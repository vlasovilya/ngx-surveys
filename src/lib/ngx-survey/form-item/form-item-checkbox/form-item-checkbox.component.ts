import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SurveyErrorStateMatcher } from '../error-state.matcher';
import { FormItem, FormItemWidget } from '../';

export class FormItemCheckbox extends FormItem {
    value: boolean;
}

@Component({
  selector: 'ammo-form-item-checkbox',
  templateUrl: './form-item-checkbox.component.html',
  styleUrls: ['./form-item-checkbox.component.scss']
})
export class FormItemCheckboxComponent implements FormItemWidget, OnInit {

    @Input() item: FormItemCheckbox;
    @Input() editable: boolean=true;
    @Output() changes = new EventEmitter<FormItemCheckbox>();
    matcher = new SurveyErrorStateMatcher();

    constructor() { }

    ngOnInit() {

    }

    onChange(value){
        console.log(value);
        this.item.value=value;
        this.changes.emit(this.item);
    }

}
