import { Component, Inject, ViewChild } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSurveyComponent } from '../../ngx-survey.component'
import { FormItem, FormSection } from '../../form-item/form-item';
import { buildField } from '../../form-item/form-item.component';
import * as _ from 'lodash';

export interface DialogSectionData {
    section: FormSection,
    params: any
}

@Component({
  selector: 'dialog-section-edit',
  templateUrl: './dialog-section-edit.html',
  styleUrls: ['./dialog-section-edit.scss']
})
export class DialogSectionEdit {

    @ViewChild('survey', { static: false }) public survey:NgxSurveyComponent;

    public section:FormSection;
    public readOnly: boolean;

    public commonFields: FormItem[] =[
        //buildField('string', {name: "name", label: "Name"}, true),
        buildField('string', {name: "title", label: "Title"}),
        buildField('string', {name: "subtitle", label: "Subtitle"}),
        /*
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
        */
    ];

    public sectionEditForm:FormSection[]=[
        {
            items: [...this.commonFields]
        }
    ];

    constructor(
        public dialogRef: MatDialogRef<DialogSectionEdit>,
        @Inject(MAT_DIALOG_DATA) public data: DialogSectionData
    ) {
        const section=data.section;
        this.readOnly=data.params.readOnly;
        this.section=section;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onFormSubmit(data){
        data.name=_.camelCase(data.title);
        this.section=data;
        this.dialogRef.close(this.section);
    }

    onOkClick(): void {
        //console.log(this.data);
        this.survey.submitForm();
    }

}
