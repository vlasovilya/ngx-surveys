import { Component, OnInit, Input, EventEmitter, forwardRef, Output, ViewChild, AfterViewInit } from '@angular/core';
import { FormItem, SurveyErrorStateMatcher, FormItemWidget } from '../index';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import * as moment from "moment";

export class FormItemDate extends FormItem {

}


export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormItemDateComponent),
  multi: true
};

const noop = () => {
};

@Component({
  selector: 'ammo-form-item-date',
  templateUrl: './form-item-date.component.html',
  styleUrls: ['./form-item-date.component.scss'],
  providers: [
    CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR
  ],
})
export class FormItemDateComponent implements FormItemWidget, OnInit, AfterViewInit, ControlValueAccessor {

    @ViewChild('inputField', { static: true }) public inputField:MatInput;

    @Input() item: FormItemDate;
    @Input() editable: boolean=true;
    @Output() changes = new EventEmitter<FormItemDate>();
    matcher = new SurveyErrorStateMatcher();

    innerValue: any;

    constructor() { }

    ngOnInit() {
        this.matcher.item=this.item;
        if (this.item.value){
            this.value=moment(this.item.value.toString());//
        }
        this.onTouchedCallback();
    }

    ngAfterViewInit(){
        //console.log(this.inputField);
        this.inputField.value='5/14/2021';
    }

    ngOnChanges() {
        this.matcher.item=this.item;
    }

    checkRequired(placeholder) {
        if (placeholder === 'Required') {
            return true;
        }
    }

    onValueChanges(ev) {
        const val=ev.value ? ev.value.format('L') : '';
        this.item.value=val;
        this.changes.emit(this.item);
    }

    //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;


  //get accessor
  get value(): any {
    return this.innerValue;
  };

  get textValue(): string {
    return this.value ? this.value.format('L') : '';
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }
   //Occured value changed from module
  writeValue(value: any): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

   registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  onChange(event) {
    this.value = event;
    this.onBlur();
  }

  onBlur() {
    this.onChangeCallback(this.innerValue);
  }

  todate(value){
    this.value = value ? moment(value) : '';
    this.onValueChanges({
        value: this.value
      })
  }

}
