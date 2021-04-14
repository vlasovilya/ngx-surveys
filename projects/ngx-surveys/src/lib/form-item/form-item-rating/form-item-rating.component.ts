import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormItem, FormItemWidget } from '../form-item';

export class FormItemRating extends FormItem {
    value: number;
}


@Component({
  selector: 'ammo-form-item-rating',
  templateUrl: './form-item-rating.component.html',
  styleUrls: ['./form-item-rating.component.scss']
})
export class FormItemRatingComponent implements FormItemWidget, OnInit {

    @Input() item: FormItemRating;
    @Input() editable: boolean=true;
    @Output() changes = new EventEmitter<FormItemRating>();

    constructor() { }

    ngOnInit() {

    }

    onRatingChanged(value){
        if (!this.editable){
            return;
        }
        this.item.value=value;
        this.changes.emit(this.item);
    }
}
