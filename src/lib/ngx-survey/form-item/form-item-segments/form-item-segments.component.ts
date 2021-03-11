import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormItem, FormItemOptionItem, FormItemWidget } from '../form-item';

export class FormItemSegments extends FormItem {
    segments: FormItemOptionItem[];
    value: string;
    hasOptions: boolean=true;
}

@Component({
  selector: 'ammo-form-item-segments',
  templateUrl: './form-item-segments.component.html',
  styleUrls: ['./form-item-segments.component.scss']
})
export class FormItemSegmentsComponent implements FormItemWidget, OnInit {

    @Input() item: FormItemSegments;
    @Input() editable: boolean=true;
    @Output() changes = new EventEmitter<FormItemSegments>();

    constructor() { }

    ngOnInit() {

    }

    onSelectionChange(value){
        this.item.value=value;
        this.changes.emit(this.item);
    }

}
