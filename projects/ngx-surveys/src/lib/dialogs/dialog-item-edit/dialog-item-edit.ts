import { Component, Inject, ViewChild } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSurveyComponent } from '../../ngx-survey.component'
import { FormItem, FormItemOptionItem } from '../../form-item/form-item';
import { buildField, buildOption, FormItemTypes } from '../../form-item/form-item.component';
import * as _ from 'lodash';

@Component({
  selector: 'dialog-item-edit',
  templateUrl: './dialog-item-edit.html',
  styleUrls: ['./dialog-item-edit.scss']
})
export class DialogItemEdit {

    @ViewChild('survey', { static: false }) public survey:NgxSurveyComponent;

    public commonFields: FormItem[] =[
        buildField('select', {name: "type", label: "Type", items: Object.keys(FormItemTypes).map(key=>{
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
        buildField('string', {name: "name", label: "Name"}, false),
        buildField('string', {name: "label", label: "Label"}),
        buildField('string', {name: "hint", label: "Hint"}),
        buildField('checkbox', {name: "required", label: "Required"}),
        buildField('checkbox', {name: "actionUpdatesSectionValue", label: "Action Updates Section Value", visibilityValuesInSection: ["radio", "select", "segments"]}),
        buildField('optionsEditor', {name: "items", label: "Options", visibilityValuesInSection: ["radio", "select"]}),
        buildField('optionsEditor', {name: "segments", label: "Segments", visibilityValuesInSection: ["segments"]}),

    ];

    public extraFields: FormItem[]=[];

    public itemEditForm:any[]=[
        {
            items: [...this.commonFields]
        }
    ];

    constructor(
        public dialogRef: MatDialogRef<DialogItemEdit>,
        @Inject(MAT_DIALOG_DATA) public data: FormItem
    ) {
        console.log(data, this.commonFields);
        if (data.fieldValidations && data.fieldValidations.rules && data.fieldValidations.rules.find(r=>r.minLength && r.minLength > 0)){
            data.required=true;
        }
    }

    onFormChange(values){
        console.log(values);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onFormSubmit(data){
        if (!data.fieldValidations){
            data.fieldValidations={};
        }
        if (!data.fieldValidations.rules){
            data.fieldValidations.rules=[];
        }
        data.name=_.camelCase(data.label);
        console.log(data);
        const minLengthRule=data.fieldValidations.rules.find(r=>r.minLength > 0);
        console.log(data, minLengthRule);
        if (data.required && !minLengthRule){
            data.fieldValidations.rules.push({
                minLength:1
            });
        }
        else if (!data.required && minLengthRule) {
            minLengthRule.minLength=0;
        }
        this.data=data;
        this.dialogRef.close(this.data);
    }

    onOkClick(): void {
        //console.log(this.data);
        this.survey.submitForm();
    }

}
