import { Component, Inject, ViewChild } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSurveyComponent } from '../../ngx-survey.component'
import { FormItem, FormItemTypes, FormItemOptionItem, buildOption, buildField } from '../../form-item/';

const allFieldTypeOptions=<FormItemOptionItem[]>[];
Object.keys(FormItemTypes).forEach(key=>{
    const type=FormItemTypes[key];
    if (type.title){
        allFieldTypeOptions.push(buildOption(key, type.title));
    }
})

@Component({
  selector: 'dialog-item-edit',
  templateUrl: './dialog-item-edit.html',
  styleUrls: ['./dialog-item-edit.scss']
})
export class DialogItemEdit {

    @ViewChild('survey', { static: false }) public survey:NgxSurveyComponent;

    public commonFields: FormItem[] =[
        buildField('select', {name: "type", label: "Type", items: allFieldTypeOptions, actionUpdatesSectionValue: true}, true),
        buildField('string', {name: "name", label: "Name"}, true),
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
