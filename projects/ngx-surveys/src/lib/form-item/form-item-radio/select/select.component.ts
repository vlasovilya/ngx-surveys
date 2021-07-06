import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { FormItemOptionItem } from '../../form-item';
import { SurveyErrorStateMatcher } from '../../error-state.matcher';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnChanges {

  @Input() label: string;
  @Input() editable: boolean=true;
  @Input() required: boolean;
  @Input() multiple: boolean;
  @Input() options: FormItemOptionItem[]=[];
  @Output() selectionChange = new EventEmitter<string | string[]>();

  @Input() value: string | string[];

  public init:boolean=true;

  matcher = new SurveyErrorStateMatcher();

  constructor() { }

  ngOnInit(): void {
  }

  isOptionSelected(option:FormItemOptionItem){
    return this.multiple ? (this.value || []).indexOf(option.optionValue) >=0 : this.value===option.optionValue;
  }

  onSelectionChange(event: MatSelectChange){
      //console.log(event);
    this.value=event.value;
    this.selectionChange.emit(this.value);
  }

  ngOnChanges(changes:SimpleChanges){
    if (changes.multiple && changes.multiple.previousValue!==changes.multiple.currentValue){
      this.init=false;
      //console.log(changes);
      setTimeout(()=>{this.init=true;}, 10);
    }
  }

}
