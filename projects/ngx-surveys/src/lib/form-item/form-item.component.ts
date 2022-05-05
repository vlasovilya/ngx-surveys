import { Component, OnInit, OnDestroy, Input, ViewChild, ComponentFactoryResolver, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormItemDirective } from './form-item.directive';

import { FormItem, FormItemWidget, FormItemValidation, FormItemOptionItem } from './form-item';
import { FormItemString, FormItemStringComponent } from './form-item-string/form-item-string.component';
import { FormItemRating, FormItemRatingComponent } from './form-item-rating/form-item-rating.component';
import { FormItemText, FormItemTextComponent } from './form-item-text/form-item-text.component';
import { FormItemDate, FormItemDateComponent } from './form-item-date/form-item-date.component';
import { FormItemSegments, FormItemSegmentsComponent } from './form-item-segments/form-item-segments.component';
import { FormItemRadio, FormItemRadioComponent } from './form-item-radio/form-item-radio.component';
import { FormItemNumericRating, FormItemNumericRatingComponent } from './form-item-numeric-rating/form-item-numeric-rating.component';
import { FormItemSelect, FormItemSelectComponent } from './form-item-select/form-item-select.component';
import { FormItemOptionsEditor, FormItemOptionsEditorComponent } from './form-item-options-editor/form-item-options-editor.component';
import { FormItemCheckbox, FormItemCheckboxComponent } from './form-item-checkbox/form-item-checkbox.component';
import { Subscription } from 'rxjs';
import { FormItemFile, FormItemFileComponent } from './form-item-file/form-item-file.component';
import { FormItemVoice, FormItemVoiceComponent } from './form-item-voice/form-item-voice.component';

export const FormItemTypes={
    'string' : {
        component: FormItemStringComponent,
        model: FormItemString,
        label: 'Short text'
    },
    text : {
        component: FormItemTextComponent,
        model: FormItemText,
        label: 'Long text'
    },
    rating : {
        component: FormItemRatingComponent,
        model: FormItemRating,
        label: 'Star rating'
    },
    numericRating : {
        component: FormItemNumericRatingComponent,
        model: FormItemNumericRating,
        label: 'Numeric rating'
    },
    segments : {
        component: FormItemSegmentsComponent,
        model: FormItemSegments,
        label: 'Segments'
    },
    radio : {
        component: FormItemRadioComponent,
        model: FormItemRadio,
        label: 'Multi Choice'
    },
    select : { //Depricated
        component: FormItemSelectComponent,
        model: FormItemSelect,
        //label: 'Select'
    },
    optionsEditor : {
        component: FormItemOptionsEditorComponent,
        model: FormItemOptionsEditor
    },
    checkbox : {
        component: FormItemCheckboxComponent,
        model: FormItemCheckbox,
        label: 'Checkbox'
    },
    date : {
        component: FormItemDateComponent,
        model: FormItemDate,
        label: 'Date'
    },
    file : {
        component: FormItemFileComponent,
        model: FormItemFile,
        label: 'File Upload'
    },
    voice : {
        component: FormItemVoiceComponent,
        model: FormItemVoice,
        label: 'Voice Record'
    },
};

export function buildOption(optionValue: string, label: string): FormItemOptionItem {
    return <FormItemOptionItem> { optionValue, label };
}

export function buildField(type:string, data:any, required?:boolean): FormItem {
    const obj=Object.assign(new (FormItemTypes[type].model), data);
    obj.type=type;

    if (required) {
        (<FormItemValidation>obj.fieldValidations)={
            rules: [
                {
                    minLength: 1
                }
            ]
        }
    }

    return obj;
}


@Component({
  selector: 'ngx-survey-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.scss']
})
export class FormItemComponent implements OnInit, OnDestroy, OnChanges {

    @Input() type: string;
    @Input() item: FormItem | FormItemString | FormItemRating | FormItemText | FormItemDate | FormItemSegments | FormItemRadio | FormItemNumericRating
        | FormItemSelect | FormItemOptionsEditor | FormItemCheckbox | FormItemFile;
    @Input() editable: boolean=true;
    @Input() isMobile: boolean=false;
    @Input() id: string;
    @Output() changes = new EventEmitter<any>();

    @ViewChild(FormItemDirective, { static: true }) public itemHost: FormItemDirective;

    private subscription: Subscription;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {

    }

    ngOnInit() {
        this.loadComponent();
    }

    ngOnChanges(changes:SimpleChanges) {

        if (changes && (changes.type || changes.id)){
            this.loadComponent();
        }
    }

    ngOnDestroy() {
        if (this.subscription){
            this.subscription.unsubscribe();
        }


    }

    loadComponent() {
        if (!FormItemTypes[this.type]){
            return;
        }

        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormItemTypes[this.type].component);

        let viewContainerRef = this.itemHost.viewContainerRef;
        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<FormItemWidget>componentRef.instance).item=this.item;
        (<FormItemWidget>componentRef.instance).editable=this.editable;
        (<FormItemWidget>componentRef.instance).isMobile=this.isMobile;

        this.subscription=(<FormItemWidget>componentRef.instance).changes.subscribe(item=>this.changes.emit(item));
    }

}
