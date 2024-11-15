import { Component, OnInit, EventEmitter, Input, Output, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { FormItemOptionItem } from '../../form-item';

@Component({
  selector: 'app-selection-list',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.scss']
})
export class SelectionListComponent implements OnInit, OnChanges {

  @Input() label: string;
  @Input() editable: boolean=true;
  @Input() required: boolean;
  @Input() multiple: boolean;
  @Input() options: FormItemOptionItem[]=[];
  @Output() selectionChange = new EventEmitter<string | string[]>();

  @Input() value: string | string[];

  @ViewChild('selectedOptions', { static: false }) public selectedOptions:MatSelectionList;

  public init:boolean=true;

  constructor() { }

  ngOnInit(): void {
  }

  isOptionSelected(option:FormItemOptionItem){
    return this.multiple ? (this.value || []).indexOf(option.optionValue) >=0 : this.value===option.optionValue;
  }

  onSelectionChange(event: MatSelectionListChange){
    //console.log(event, this.selectedOptions);
    this.value=this.multiple ? this.selectedOptions.selectedOptions.selected.map(op=>op.value) : event.options[0].value;
    this.selectionChange.emit(this.value);
  }

  ngOnChanges(changes:SimpleChanges){
    if (changes.multiple && changes.multiple.previousValue!==changes.multiple.currentValue){
      this.init=false;
      //console.log(changes);
      setTimeout(()=>{this.init=true;}, 10);
    }
  }

  onOptionClick(event, option:FormItemOptionItem){
    /*
    console.log(event, option);
    if (!this.required){
        if (this.multiple && this.value.indexOf(option.optionValue)>=0 && Array.isArray(this.value)){
          this.value=this.value.filter(str=>str!==option.optionValue);
          this.selectionChange.emit(this.value);
        }
        else if (this.value===option.optionValue) {
          this.value='';
          this.selectionChange.emit(this.value);
        }
    }
    */
  }

}
