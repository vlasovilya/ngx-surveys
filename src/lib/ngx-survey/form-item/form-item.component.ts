import { Component, OnInit, OnDestroy, Input, ViewChild, ComponentFactoryResolver, Output, EventEmitter, OnChanges } from '@angular/core';
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

export const FormItemTypes={
    'string' : {
        component: FormItemStringComponent,
        model: FormItemString,
        title: 'Short text'
    },
    text : {
        component: FormItemTextComponent,
        model: FormItemText,
        title: 'Long text'
    },
    rating : {
        component: FormItemRatingComponent,
        model: FormItemRating,
        title: 'Star rating'
    },
    numericRating : {
        component: FormItemNumericRatingComponent,
        model: FormItemNumericRating,
        title: 'Numeric rating'
    },
    segments : {
        component: FormItemSegmentsComponent,
        model: FormItemSegments,
        title: 'Segments'
    },
    radio : {
        component: FormItemRadioComponent,
        model: FormItemRadio,
        title: 'Radio'
    },
    select : {
        component: FormItemSelectComponent,
        model: FormItemSelect,
        title: 'Select'
    },
    optionsEditor : {
        component: FormItemOptionsEditorComponent,
        model: FormItemOptionsEditor
    },
    checkbox : {
        component: FormItemCheckboxComponent,
        model: FormItemCheckbox,
        title: 'Checkbox'
    },
    date : {
        component: FormItemDateComponent,
        model: FormItemDate,
        title: 'Date'
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
        | FormItemSelect | FormItemOptionsEditor | FormItemCheckbox;
    @Input() editable: boolean=true;
    @Output() changes = new EventEmitter<any>();

    @ViewChild(FormItemDirective, { static: true }) public itemHost: FormItemDirective;

    private subscription;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {

    }

    ngOnInit() {
        this.loadComponent();
    }

    ngOnChanges(changes) {

        if (changes && changes.type){
            this.loadComponent();
        }
    }

    ngOnDestroy() {
        if (this.subscription){
            this.subscription.unsubscribe();
        }


    }

    loadComponent() {

        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormItemTypes[this.type].component);

        let viewContainerRef = this.itemHost.viewContainerRef;
        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<FormItemWidget>componentRef.instance).item=this.item;
        (<FormItemWidget>componentRef.instance).editable=this.editable;

        this.subscription=(<FormItemWidget>componentRef.instance).changes.subscribe(item=>this.changes.emit(item));
    }

}
