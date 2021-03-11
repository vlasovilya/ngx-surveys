import { Component, Inject, ViewChild } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSurveyComponent } from '../../ngx-survey.component'
import { FormItem, FormSection, buildField } from '../../form-item/';


@Component({
  selector: 'dialog-section-edit',
  templateUrl: './dialog-section-edit.html',
  styleUrls: ['./dialog-section-edit.scss']
})
export class DialogSectionEdit {

    @ViewChild('survey', { static: false }) public survey:NgxSurveyComponent;

    public commonFields: FormItem[] =[
        buildField('string', {name: "name", label: "Name"}, true),
        buildField('string', {name: "title", label: "Title"}),
        buildField('string', {name: "subtitle", label: "Subtitle"}),
        buildField('select', {name: "sectionStyle", label: "Section Style", items: [
            {
                optionValue: 'Bold',
                label: 'Bold',
                style: "Checkmark"
            },
            {
                optionValue: 'Normal',
                label: 'Normal',
                style: "Checkmark"
            }
        ]}, true),
    ];

    public sectionEditForm:FormSection[]=[
        {
            items: [...this.commonFields]
        }
    ];

    constructor(
        public dialogRef: MatDialogRef<DialogSectionEdit>,
        @Inject(MAT_DIALOG_DATA) public data: FormSection
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    onFormSubmit(data){
        this.data=data;
        this.dialogRef.close(this.data);
    }

    onOkClick(): void {
        //console.log(this.data);
        this.survey.submitForm();
    }

}
