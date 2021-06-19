import { Component, Inject, ViewChild } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSurveyComponent } from '../../ngx-survey.component'
import { FormItem, FormItemOptionItem } from '../../form-item/form-item';
import { buildField, buildOption, FormItemTypes } from '../../form-item/form-item.component';
import * as _ from 'lodash';

export interface DialogItemData {
    item: FormItem,
    params: any
}

@Component({
  selector: 'dialog-item-edit',
  templateUrl: './dialog-item-edit.html',
  styleUrls: ['./dialog-item-edit.scss']
})
export class DialogItemEdit {

    @ViewChild('survey', { static: false }) public survey:NgxSurveyComponent;

    public item:FormItem;

    public commonFields: FormItem[];

    public extraFields: FormItem[]=[];

    public itemEditForm:any[];

    public multiChoiseFieldsOnly:boolean;
    public customFieldNamesAllowed:boolean;
    public readOnly: boolean;

    public multiChoiseFieldTypes:string[]=["radio", "select", "segments"];

    constructor(
        public dialogRef: MatDialogRef<DialogItemEdit>,
        @Inject(MAT_DIALOG_DATA) public data: DialogItemData
    ) {
        console.log(data, this.commonFields);
        const item=data.item;
        if (item.fieldValidations && item.fieldValidations.rules && item.fieldValidations.rules.find(r=>r.minLength && r.minLength > 0)){
            item.required=true;
        }
        this.item=item;
        this.multiChoiseFieldsOnly=data.params.multiChoiseFieldsOnly;
        this.customFieldNamesAllowed=data.params.customFieldNamesAllowed;
        this.readOnly=data.params.readOnly;
        this.setFormFields();
    }

    setFormFields(){
        console.log(Object.keys(FormItemTypes).filter(key=>this.multiChoiseFieldsOnly ? this.multiChoiseFieldTypes.indexOf(key)>=0 : true));
        this.commonFields=[
            buildField('select', {name: "type", label: "Type", items: Object.keys(FormItemTypes).filter(key=>this.multiChoiseFieldsOnly ? this.multiChoiseFieldTypes.indexOf(key)>=0 : true).map(key=>{
                const item=<FormItemOptionItem>FormItemTypes[key];
                return item.label ? buildOption(key, item.label) : null;
            }).filter(t=>t), actionUpdatesSectionValue: true}, true),
            buildField('select', {name: "style", label: "Text Field Style", items: [
                buildOption('text', 'Standard Text Field'),
                buildOption('number', 'Number'),
                buildOption('email', 'E-mail'),
                buildOption('password', 'Password'),
                buildOption('url', 'URL'),
            ], visibilityValuesInSection: ["string"], value:'text'}, true),
            buildField('select', {name: "style", label: "Radio Buttons Style", items: [
                buildOption('list', 'List with selection'),
                buildOption('buttons', 'Buttons'),
            ], visibilityValuesInSection: ["radio"], value:'list'}, true),
            buildField('string', {name: "name", label: "Name", visibilityValuesInSection: !this.customFieldNamesAllowed ? ['none'] : undefined}, false),
            buildField('string', {name: "label", label: "Label"}),
            buildField('string', {name: "hint", label: "Hint"}),
            buildField('checkbox', {name: "required", label: "Required"}),
            buildField('checkbox', {name: "actionUpdatesSectionValue", label: "Action Updates Section Value", visibilityValuesInSection: this.multiChoiseFieldTypes}),
            buildField('optionsEditor', {name: "items", label: "Options", visibilityValuesInSection: ["radio", "select"], allowCustomAnswers: !this.multiChoiseFieldsOnly, allowCustomOptionValues: this.customFieldNamesAllowed}),
            buildField('optionsEditor', {name: "segments", label: "Segments", visibilityValuesInSection: ["segments"], allowCustomAnswers: !this.multiChoiseFieldsOnly, allowCustomOptionValues: this.customFieldNamesAllowed}),

        ];
        this.itemEditForm=[
            {
                items: [...this.commonFields]
            }
        ];
    }

    onFormChange(values){
        console.log(values);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onFormSubmit(item){
        if (!item.fieldValidations){
            item.fieldValidations={};
        }
        if (!item.fieldValidations.rules){
            item.fieldValidations.rules=[];
        }
        item.name=_.camelCase(item.label);
        console.log(item);
        const minLengthRule=item.fieldValidations.rules.find(r=>r.minLength > 0);
        console.log(item, minLengthRule);
        if (item.required && !minLengthRule){
            item.fieldValidations.rules.push({
                minLength:1
            });
        }
        else if (!item.required && minLengthRule) {
            minLengthRule.minLength=0;
        }
        this.item=item;
        this.dialogRef.close(this.item);
    }

    onOkClick(): void {
        //console.log(this.data);
        this.survey.submitForm();
    }

}
