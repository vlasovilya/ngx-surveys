import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormItem, FormItemWidget } from '../form-item';

export class FormItemNumericRating extends FormItem {
    value: number;
}

@Component({
  selector: 'ammo-form-item-numeric-rating',
  templateUrl: './form-item-numeric-rating.component.html',
  styleUrls: ['./form-item-numeric-rating.component.scss']
})
export class FormItemNumericRatingComponent implements FormItemWidget, OnInit {

    @Input() item: FormItemNumericRating;
    @Input() editable: boolean=true;
    @Output() changes = new EventEmitter<FormItemNumericRating>();

    constructor() { }

    ngOnInit() {

    }

    onSelectionChange(value){
        this.item.value=value;
        this.changes.emit(this.item);
    }

}
