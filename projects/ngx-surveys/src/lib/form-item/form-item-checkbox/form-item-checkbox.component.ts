import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SurveyErrorStateMatcher } from '../error-state.matcher';
import { FormItem, FormItemWidget } from '../form-item';

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

    onChange(event:MatCheckboxChange){
        console.log(event);
        this.item.value=event.checked;
        this.changes.emit(this.item);
    }

}
