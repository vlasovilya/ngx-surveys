import { Component, Inject, ViewChild } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSurveyComponent } from '../../ngx-survey.component'
import { FormItem, FormSection, buildField } from '../../form-item/';


export interface FormItemVisibilityData {
    sectionItems: FormItem[],
    visibility: string[],
}

@Component({
  selector: 'dialog-item-visibility',
  templateUrl: './dialog-item-visibility.html',
  styleUrls: ['./dialog-item-visibility.scss']
})
export class DialogItemVisibility {

    @ViewChild('survey', { static: false }) public survey:NgxSurveyComponent;

    public formFields: FormItem[] =[

    ];

    public extraFields: FormItem[]=[];

    public itemEditForm: FormSection[]=[
        {
            items: []
        }
    ];

    public value:any;

    constructor(
        public dialogRef: MatDialogRef<DialogItemVisibility>,
        @Inject(MAT_DIALOG_DATA) public data: FormItemVisibilityData
    ) {
        console.log(data);
        const value={};
        this.formFields=data.sectionItems.map(item=>{
            this.data.visibility.forEach(val=>{
                value[item.name]=val;
            });
            return buildField('radio', {name: item.name, label: item.label || item.name, items: item.items || item.segments}, false);
        });
        this.value=value;
        this.itemEditForm=[{
            items: this.formFields
        }];
        console.log(this.itemEditForm, value);

    }

    onFormChange(values){
        console.log(values);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onFormSubmit(value){
        this.dialogRef.close(value);
    }

    onOkClick(): void {
        //console.log(this.data);
        this.survey.submitForm();
    }

}
