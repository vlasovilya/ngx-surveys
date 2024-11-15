import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  MatTableDataSource
} from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ItemOptionStateMatcher } from '../error-state.matcher';
import { FormItem, FormItemOptionItem, FormItemWidget, FormItemValidation, FormItemValidationRules } from '../form-item';

export class FormItemOptionsEditor extends FormItem {
    value: FormItemOptionItem[];
    hasOptions: boolean=true;
    useCustomOptionValues:  boolean=false;
    allowCustomOptionValues:  boolean=true;
    allowCustomAnswers:  boolean=true;
    multiple:  boolean=false;
    defaultValue: string | string[];
    fieldValidations: FormItemValidation={
        rules: <FormItemValidationRules[]> [
            {
                "optionKeyValues": true
            }
        ]
    };
}

@Component({
  selector: 'ammo-form-item-options-editor',
  templateUrl: './form-item-options-editor.component.html',
  styleUrls: ['./form-item-options-editor.component.scss']
})
export class FormItemOptionsEditorComponent implements FormItemWidget, OnInit {

    @Input() item: FormItemOptionsEditor;
    @Input() editable: boolean=true;
    @Output() changes = new EventEmitter<FormItemOptionsEditor>();
    matcher = new ItemOptionStateMatcher();
    dataSource = new MatTableDataSource<FormItemOptionItem>([]);
    public columns: string[];

    public useCustomValues:boolean=false;
    public allowCustomValues:boolean=true;
    public allowCustomAnswers:boolean=true;

    constructor() { }

    ngOnInit() {
        if (!this.item.value){
            this.item.value=[];
        }
        this.dataSource.data=this.item.value;
        this.useCustomValues=this.item.useCustomOptionValues;
        this.allowCustomValues=this.item.allowCustomOptionValues;
        this.allowCustomAnswers=this.item.allowCustomAnswers;
        this.setColumns();
        this.item.value.forEach(option=>{
            option.selected=this.isOptionSelected(option);
        });
        console.log(this.item);

    }

    setColumns(){
        this.columns=this.useCustomValues ? ['selectedByDefault', 'optionValue', 'label', 'actions'] : ['selectedByDefault', 'label', 'actions'];
    }

    onUseCustomValuesChange(ev){
        this.useCustomValues=ev.checked;
        this.item.useCustomOptionValues=this.useCustomValues;
        this.setColumns();
    }

    onValueChange(value){
        this.item.value=value;
        //console.log(this.item);
        if (this.useCustomValues){
            (this.item.value || []).forEach(field=>{
                field.optionValue=field.label;
            })
        }
        this.changes.emit(this.item);
    }

    isOptionSelected(option){
        //console.log(option);
        const item=this.item;
        return item.multiple ? (item.defaultValue || []).indexOf(option.optionValue) >=0 : item.defaultValue===option.optionValue;
    }
    setDefaultValue(option, checked) {
        const item=this.item;
        if (item.multiple){
            let value=[...item.defaultValue];
            const selectedIndex=value.indexOf(option.optionValue);
            if (selectedIndex>=0){
                checked ? value.push(option.optionValue) : value=value.filter((str, index)=>index!==selectedIndex);
            }
            else if (checked) {
                value.push(option.optionValue);
            }
            item.defaultValue=value;
        }
        else {
            item.defaultValue=checked ? option.optionValue : '';
        }
        (this.item.value || []).forEach(option=>{
            option.selected=this.isOptionSelected(option);
        });
        this.changes.emit(this.item);
    }

    onOptionLabelChange(value, option) {
        if (!this.useCustomValues){
            option.optionValue=value;
        }
    }

    addOption(){
        const obj=<FormItemOptionItem>{};

        this.item.value.push(obj);
        this.dataSource.data=this.item.value;
    }

    removeOption(option){
        this.item.value=this.item.value.filter((op, index)=>index!==this.item.value.indexOf(option));
        this.dataSource.data=this.item.value;
    }

    onListDropped(event: CdkDragDrop<FormItemOptionItem[]>) {
        const previousIndex = this.dataSource.data.findIndex(row => row === event.item.data);
        moveItemInArray(this.dataSource.data,previousIndex, event.currentIndex);
        this.dataSource.data = this.dataSource.data.slice();
        //console.log('dropped', JSON.stringify(this.dataSource.data), JSON.stringify(this.item.value));
    }

    toggleExplanationField (option) {
        option.showExplanation=!option.showExplanation;
    }
}
