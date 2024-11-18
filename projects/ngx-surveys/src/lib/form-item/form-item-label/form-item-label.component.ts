import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormItem, FormItemWidget } from '../index';

export class FormItemLabel extends FormItem {
    htmlContent: string;
}

@Component({
    selector: 'app-form-item-label',
    templateUrl: './form-item-label.component.html',
    styleUrl: './form-item-label.component.scss'
})
export class FormItemLabelComponent implements FormItemWidget, OnInit, OnChanges {

    @Input() item: FormItemLabel;
    @Input() editable: boolean=true;
    @Output() changes = new EventEmitter<FormItemLabel>();

    constructor() { }

    ngOnInit() {
        //console.log(this.item);
    }

    ngOnChanges() {
    }

    checkRequired(placeholder) {

    }

    onValueChanges(item) {
        this.changes.emit(item);
    }
}
