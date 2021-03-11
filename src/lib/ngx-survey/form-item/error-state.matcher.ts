import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class SurveyErrorStateMatcher implements ErrorStateMatcher {
    public item:any;
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !(this.item && !(this.item.errors && this.item.errors.length));
  }
}

export class ItemOptionStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: FormGroupDirective | NgForm): boolean {
    //console.log(control);
    return control && !control.value;
  }
}
