import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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

    explanationValue: string='';
    explanationLabel: string | undefined;
    selectedOption: string;

    constructor() { }

    ngOnInit() {
        //console.log(this.item);
        if (this.item && !this.item.multiple && Array.isArray(this.item.value)){
            this.item.value=this.item.value[0];
        }
        //console.log(this.item.value);
        let selectedOptionObj=this.item.items.find(op=>op.optionValue===this.item.value);
        this.selectedOption=selectedOptionObj ? selectedOptionObj.optionValue : '';
        if (!this.selectedOption && this.item.value && !this.item.multiple){
            const valArr=(this.item.value.toString()).split(', ');

            selectedOptionObj=this.item.items.find(op=>op.optionValue===valArr[0]);
            //console.log(valArr, selectedOptionObj);
            if (selectedOptionObj){
                this.selectedOption=selectedOptionObj.optionValue;
                this.explanationValue=valArr.slice(1, valArr.length).join(', ');
            }
        }
        //console.log(this.item.value);
    }


    onSelectionChange(value:string | string[]){
        //console.log(value);
        this.item.value=value;
        if (!Array.isArray(value)){
            this.selectedOption=value;
            this.onExplanationValueChanges(this.explanationValue, this.item.value);
        }
        this.changes.emit(this.item);
    }


    onExplanationValueChanges(val:string, selectedOptionVal:string | string[]){
        //console.log(val);
        //console.log(val, selectedOptionVal);
        const option=this.item.items.find(op=>op.optionValue===selectedOptionVal);
        if (!option || !this.isExplanationRequired(option.optionValue)){
            return false;
        }

        this.item.value=option.optionValue+', '+val;
        this.changes.emit(this.item);
    }

    isExplanationRequired(selectedOptionVal:string | string[]){
        //console.log(selectedOptionVal);
        const option=this.item.items.find(op=>op.optionValue===selectedOptionVal);
        if (!option){
            return false;
        }
        this.explanationLabel=option.explanationLabel
        return option && option.showExplanation;
    }
}
