import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxSurveyService } from '../ngx-survey.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as _ from 'lodash';
import * as moment from 'moment';

import { MatDialog } from '@angular/material/dialog';

import { DialogSectionEdit, DialogItemEdit, DialogItemVisibility } from '../dialogs';
import { FormItem, FormSection, buildField } from '../form-item/';


@Component({
  selector: 'ngx-survey-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {

    @Input() form:FormSection[];
    @Output() changes = new EventEmitter<any[]>();

    public formValues:any={};
    public editable:boolean=true;
    public sortableSectionOptions:any={
        onUpdate: (event: any) => {
            //event;
            console.log(event);
            this.changes.emit(this.form);
        },
        //handle: '.sortable-handle'
    }

    onSectionDropped(event: CdkDragDrop<FormItem[]>){
        const previousIndex = this.form.findIndex(row => event.item && row === event.item.data);
        moveItemInArray(this.form,previousIndex, event.currentIndex);
        this.form = this.form.slice();
        this.changes.emit(this.form);
    }

    onItemDropped(event: CdkDragDrop<FormItem[]>, section: FormSection){
        const previousIndex = (section.items || []).findIndex(row => event.item && row === event.item.data);
        moveItemInArray((section.items || []),previousIndex, event.currentIndex);
        section.items = (section.items || []).slice();
        this.changes.emit(this.form);
    }

    public sortableItemOptions:any={
        onUpdate: (event: any) => {
            //event;
            console.log(event);
            this.changes.emit(this.form);
        },
        handle: '.form-item'
    }

    constructor(
        public service: NgxSurveyService,
        public dialog: MatDialog,
    ) { }


    openSectionDialog(section: FormSection): void {
        const dialogRef = this.dialog.open(DialogSectionEdit, {
            width: '450px',
            data: section
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            section=_.extend(section, result);
            this.changes.emit(this.form);
        });
    }

    openItemDialog(item: FormItem, section?: FormSection): void {
        const dialogRef = this.dialog.open(DialogItemEdit, {
            width: '450px',
            data: _.cloneDeep(item)
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            if (result){
                item=_.extend(item, result);
                item.justAdded=false;
                this.changes.emit(this.form);
            }
            else if(section && item.justAdded) {
                this.removeField(item, section);
            }
        });
    }

    getSectionValueItemsForItem(item: FormItem, section: FormSection){
        return (section.items || []).filter(sItem=>sItem.actionUpdatesSectionValue && sItem.name!==item.name);
    }

    openItemVisibilityDialog(item: FormItem, section: FormSection): void {

        const sectionValueItems=this.getSectionValueItemsForItem(item, section);

        const dialogRef = this.dialog.open(DialogItemVisibility, {
            width: '450px',
            data: {
                sectionItems: sectionValueItems,
                visibility: item.visibilityValuesInSection || []
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            if (result){
                item.visibilityValuesInSection=[];
                sectionValueItems.forEach(sItem=>{
                    if (result[sItem.name]){
                        item.visibilityValuesInSection.push(result[sItem.name]);
                    }
                });
                console.log(item);
            }

            /*
            if (result){
                item=_.extend(item, result);
                this.changes.emit(this.form);
            }
            else if(section && item.justAdded) {
                this.removeField(item, section);
            }*/
        });
    }

    ngOnInit() {
        this.form=this.service.initForm(this.form, this.formValues);
    }

    getDateStr(time) {
        time = time / 1000000;
        return moment.utc(time).format("MM/DD/YYYY");
    };

    getDateValue(str) {
        var dt = new Date(str);
        dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());

        return dt;
    };


/*
    setItemValue(item, value) {
        item.value = item.multiple ? _.contains(item.value || [], value) ? _.without(item.value, value) : _.union(item.value || [], [value]) : value;
    };

    isSelected(item, value) {
        return item.multiple ? _.contains(item.value || [], value) : item.value === value;
    };
*/

    onItemChanges(item: FormItem): void {
        item.errors=this.service.getErrors(item);
        this.changes.emit(this.form);
    }

    removeField(item: FormItem, section: FormSection): void {
        section.items=(section.items || []).filter((op, index)=>index!==(section.items || []).indexOf(item));
    }

    addFeild(section: FormSection): void {
        if (!section.items){
            section.items=[];
        }
        const field=buildField('string', {name: "", label: ""});
        field.justAdded=true;
        section.items.push(field);
        this.openItemDialog(field, section);
    }

    removeSection(section: FormSection): void {
        this.form=this.form.filter((op, index)=>index!==this.form.indexOf(section));
    }

    addSection(): void {

        this.form.push(<FormSection> {

        });
    }

}
