import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { FormItem, FormItemOptionItem, FormItemWidget } from '../form-item';

export class FormItemRadio extends FormItem {
    items: FormItemOptionItem[];
    multiple: boolean;
    value: string | string[];
    hasOptions: boolean=true;
    otherTextValue: string;
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

    explanationValue: string='';
    explanationLabel: string | undefined;
    selectedOption: string;

    constructor() { }

    ngOnInit() {
        if (this.item && !this.item.multiple && Array.isArray(this.item.value)){
            this.item.value=this.item.value[0];
        }
        let selectedOptionObj=this.item.items.find(op=>op.optionValue===this.item.value);
        this.selectedOption=selectedOptionObj ? selectedOptionObj.optionValue : '';
        if (!this.selectedOption && this.item.value){
            const valArr=(this.item.value.toString()).split(', ');

            selectedOptionObj=this.item.items.find(op=>op.optionValue===valArr[0]);
            console.log(valArr, selectedOptionObj);
            if (selectedOptionObj){
                this.selectedOption=selectedOptionObj.optionValue;
                this.explanationValue=valArr.slice(1, valArr.length).join(', ');
            }
        }
    }

    onSelectionChange(event){
        if (event.option && event.option.value && !this.item.multiple){
            this.item.value=event.option.value;
        }
        else if (this.item.multiple){
            this.item.value=this.selectedOptions.selectedOptions.selected.map(op=>op.value);
        }
        else if (event.value){
            this.item.value=event.value;
            this.onExplanationValueChanges(this.explanationValue, this.item.value);
        }
        console.log(this.item.value);
        this.changes.emit(this.item);
    }

    isOptionSelected(option){
        const item=this.item;
        return item.multiple ? (item.value || []).indexOf(option.optionValue) >=0 : this.selectedOption===option.optionValue;
    }

    onExplanationValueChanges(val, selectedOptionVal){
        console.log(val, selectedOptionVal);
        const option=this.item.items.find(op=>op.optionValue===selectedOptionVal);
        if (!option || !this.isExplanationRequired(option.optionValue)){
            return false;
        }

        this.item.value=option.optionValue+', '+val;
        this.changes.emit(this.item);
    }

    isExplanationRequired(selectedOptionVal){
        const option=this.item.items.find(op=>op.optionValue===selectedOptionVal);
        if (!option){
            return false;
        }
        this.explanationLabel=option.explanationLabel
        return option && option.showExplanation;
    }
}
