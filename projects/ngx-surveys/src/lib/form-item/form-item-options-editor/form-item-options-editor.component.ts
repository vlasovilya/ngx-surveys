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
    columns=['optionValue', 'label', 'actions'];

    constructor() { }

    ngOnInit() {
        if (!this.item.value){
            this.item.value=[];
        }
        this.dataSource.data=this.item.value;
    }

    onValueChange(value){
        console.log(value);
        this.item.value=value;
        this.changes.emit(this.item);
    }

    addOption(){
        this.item.value.push(<FormItemOptionItem>{});
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
        console.log('dropped', JSON.stringify(this.dataSource.data), JSON.stringify(this.item.value));
    }
}
