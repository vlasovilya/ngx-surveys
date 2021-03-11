import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { FormItem, FormItemOptionItem, FormItemWidget } from '../form-item';

export class FormItemRadio extends FormItem {
    items: FormItemOptionItem[];
    multiple: boolean;
    value: string | string[];
    hasOptions: boolean=true;
}

@Component({
  selector: 'ammo-form-item-radio',
  templateUrl: './form-item-radio.component.html',
  styleUrls: ['./form-item-radio.component.scss']
})
export class FormItemRadioComponent implements FormItemWidget, OnInit {

    @Input() item: FormItemRadio;
    @Input() editable: boolean=true;
    @Output() changes = new EventEmitter<FormItemRadio>();
    @ViewChild('selectedOptions', { static: true }) public selectedOptions:MatSelectionList;

    constructor() { }

    ngOnInit() {
        if (this.item && !this.item.multiple && Array.isArray(this.item.value)){
            this.item.value=this.item.value[0];
        }
    }

    onSelectionChange(event){

        if (event.option && event.option.value && !this.item.multiple){
            this.item.value=event.option.value;
        }
        else if (this.item.multiple){
            this.item.value=this.selectedOptions.selectedOptions.selected.map(op=>op.value);
        }
        //console.log(this.item.value);
        this.changes.emit(this.item);
    }

    isOptionSelected(option){
        const item=this.item;
        return item.multiple ? (item.value || []).indexOf(option.optionValue) >=0 : item.value===option.optionValue;
    }
}
