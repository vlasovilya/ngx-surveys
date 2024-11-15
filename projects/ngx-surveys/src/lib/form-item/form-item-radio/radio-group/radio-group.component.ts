import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormItemOptionItem } from '../../form-item';
import { MatRadioChange } from '@angular/material/radio';
import { MatCheckboxChange } from '@angular/material/checkbox';


@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss']
})
export class RadioGroupComponent implements OnInit {

  @Input() label: string;
  @Input() editable: boolean=true;
  @Input() required: boolean;
  @Input() multiple: boolean;
  @Input() options: FormItemOptionItem[]=[];
  @Output() selectionChange = new EventEmitter<string | string[]>();

  @Input() value: string | string[];

  constructor() { }

  ngOnInit(): void {
  }

  isOptionSelected(option:FormItemOptionItem){
    return this.multiple ? (this.value || []).indexOf(option.optionValue) >=0 : this.value===option.optionValue;
  }

  onSelectionChange(event:MatRadioChange){
      this.selectionChange.emit(event.value);
  }
  onCheckboxSelectionChange(event:MatCheckboxChange){
    let value=this.value && Array.isArray(this.value) ? this.value : [];
    if (event.checked){
        value.push(event.source.value);
    }
    else {
      value=value.filter(v=>v!==event.source.value);
    }
    //console.log(value);
    this.selectionChange.emit(value);
  }

}
