import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SurveyErrorStateMatcher } from '../error-state.matcher';
import { FormItem, FormItemOptionItem, FormItemWidget } from '../form-item';

export class FormItemSelect extends FormItem {
    items: FormItemOptionItem[];
    value: string;
    hasOptions: boolean=true;
}

@Component({
  selector: 'ammo-form-item-select',
  templateUrl: './form-item-select.component.html',
  styleUrls: ['./form-item-select.component.scss']
})
export class FormItemSelectComponent implements FormItemWidget, OnInit {

    @Input() item: FormItemSelect;
    @Input() editable: boolean=true;
    @Output() changes = new EventEmitter<FormItemSelect>();
    matcher = new SurveyErrorStateMatcher();

    constructor() { }

    ngOnInit() {

    }

    onSelectionChange(value){
        console.log(value);
        this.item.value=value;
        this.changes.emit(this.item);
    }

    isOptionSelected(option){
        const item=this.item;
        return item.value===option.optionValue;
    }
}
