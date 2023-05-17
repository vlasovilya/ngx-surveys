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
            buildField('select', {name: "fileType", label: "Uploader Type", items: [
                buildOption('image', 'Image'),
                buildOption('video', 'Video'),
                buildOption('file', 'Any File'),
            ], visibilityValuesInSection: ["file"], value:'image'}, true),
            buildField('select', {name: "style", label: "Style", items: [
                buildOption('list', 'List with selection'),
                buildOption('buttons', 'Radio Buttons'),
                buildOption('select', 'Select'),
            ], visibilityValuesInSection: ["radio"], value:'list'}, true),
            buildField('checkbox', {name: "multiple", label: "Allow multiple files upload", visibilityValuesInSection: ["file"]}),
            /*
            buildField('string', {name: "areaLabel", label: "Area Label", visibilityValuesInSection: ["file"], defaultValue:'Drag and drop files here or use "Browse Files" button'}),
            buildField('string', {name: "buttonLabel", label: "Button Label", visibilityValuesInSection: ["file"], defaultValue:'Browse Files'}),
            */
            buildField('string', {name: "name", label: "Name", visibilityValuesInSection: !this.customFieldNamesAllowed ? ['none'] : undefined}, false),
            buildField('text', {name: "label", label: "Label"}),
            buildField('text', {name: "hint", label: "Hint"}),
            buildField('checkbox', {name: "required", label: "Required"}),
            buildField('checkbox', {name: "actionUpdatesSectionValue", label: "Action Updates Section Value", visibilityValuesInSection: [this.multiChoiseFieldTypes]}),
            buildField('checkbox', {name: "multiple", label: "Multiple Answers", visibilityValuesInSection: ["radio"]}),
            buildField('optionsEditor', {name: "items", label: "Options", visibilityValuesInSection: [["radio", "select"]], allowCustomAnswers: !this.multiChoiseFieldsOnly, allowCustomOptionValues: this.customFieldNamesAllowed, defaultValue: this.item.value, multiple: this.item.multiple}),
            buildField('optionsEditor', {name: "segments", label: "Segments", visibilityValuesInSection: ["segments"], allowCustomAnswers: false, allowCustomOptionValues: this.customFieldNamesAllowed, defaultValue: this.item.value}),

        ];
        this.itemEditForm=[
            {
                items: [...this.commonFields]
            }
        ];
    }

    onFormChange(values:FormItem){
        console.log(values, this.itemEditForm);
        const optionsEditField=this.itemEditForm[0].items.find(f=>f.name==='items');
        if (optionsEditField && optionsEditField.multiple!==values.multiple){
            optionsEditField.multiple=values.multiple;
            if (values.multiple){
                optionsEditField.defaultValue=[];
            }
        }
        console.log(optionsEditField);
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
        if (!item.name || !this.customFieldNamesAllowed){
            item.name=_.camelCase(item.label);
        }
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
        ['segments', 'items'].forEach(key=>{
            if (item[key] && item[key].length){
                let defaultValArr:string[]=[];
                let defaultValStr='';
                item[key].forEach(option=>{
                    if (option.selected){
                        defaultValArr.push(option.optionValue);
                        defaultValStr=option.optionValue;
                    }
                    delete option.selected;
                });
                item.value=item.multiple ? defaultValArr : defaultValStr;
            }
        })
        this.item=item;
        this.dialogRef.close(this.item);
    }

    onOkClick(): void {
        //console.log(this.data);
        this.survey.submitForm();
    }

}
