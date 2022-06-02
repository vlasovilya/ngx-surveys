import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
//import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ResizedEvent } from 'angular-resize-event';
//import { Subscription } from 'rxjs';
import { NgxSurveyService } from './ngx-survey.service';
import { MatStepper } from '@angular/material/stepper';


@Component({
  selector: 'ngx-survey',
  templateUrl: './ngx-survey.component.html',
  styleUrls: ['./ngx-survey.component.scss']
})
export class NgxSurveyComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input() form:any[];
    @Input() value:any={};
    @Input() splitBySteps:boolean;
    @Input() validateByStepChange:boolean=true;
    @Input() submitInProgress:boolean;
    @Input() submitErrorText:string;
    @Input() editable:boolean=true;

    @Output() valueChange = new EventEmitter<any>();
    @Output() stepChanged = new EventEmitter<any>();
    @Output() submit = new EventEmitter<any>();
    @Output() resized = new EventEmitter<ResizedEvent>();

    @ViewChild('stepper', { static: false }) public stepper:MatStepper;

    public selectedIndex: number = 0;
    public isMobile: boolean;

    get submitDisabled(): boolean {
        return !!this.form.find(section=>section.items.find(item=>item.busy));
    }

    //private _bpSub: Subscription;

    constructor(
        //private bpObserver: BreakpointObserver,
        private elRef:ElementRef,
        public service: NgxSurveyService,
    ) {

    }

    ngOnInit() {
        //console.log(this.value);
        this.form=this.service.initForm(this.form, this.value);
        if (this.splitBySteps){
            this.form.forEach(section=>{
                section.isEditable=true;
            });
        }
        /*
        this._bpSub = this.bpObserver
          .observe(['(max-width: 599px)'])
          .subscribe((state: BreakpointState) => {
            this.setMobileStepper(state.matches);
          });
          */
    }

    ngAfterViewInit() {
        //console.log(this.stepper);
    }

    onResized(event: ResizedEvent) {

        if (event.newRect.width<600 && !this.isMobile){
            this.setMobileStepper(true);
        }
        else if (event.newRect.width>=600 && this.isMobile){
            this.setMobileStepper(false);
        }
        this.resized.emit(event);
        //this.width = event.newWidth;
        //this.height = event.newHeight;
    }

    scrollToField(field) {
        let el = this.elRef.nativeElement.querySelector('#form_item_' + field.name);
        if (el){
            el.scrollIntoView();
        }
    };

    isStepEnabled(section){
        const prevSection=this.form[this.form.indexOf(section)-1];
        return !this.validateByStepChange || !prevSection || (prevSection && prevSection.submited && !prevSection.hasError);
    }

    onItemChanges(item) {
        if (!this.editable){
            return;
        }
        item.errors=this.service.getErrors(item);
        const {value}=this.service.getValue(this.form, false);
        this.valueChange.emit(value);
    }

    selectionChanged(event: any): void {
    this.selectedIndex = event.selectedIndex;
  }

  setMobileStepper(isMobile: boolean): void {

    this.isMobile = isMobile;
    setTimeout(() => {
        if (this.stepper){
            this.stepper.selectedIndex = this.selectedIndex;
        }
    });
  }

    onStepChange(step) {
        //console.log(step);
        this.stepChanged.emit(step);
        if (this.validateByStepChange && step.previouslySelectedIndex>=0 && this.form[step.previouslySelectedIndex]){
            this.submitStep(this.form[step.previouslySelectedIndex], false);
        }


//        this.stepper.selectedIndex=0;
    }

    submitForm(){

        const {valid, value, firstError}=this.service.getValue(this.form, true);
        if (valid){
            this.submit.emit(value);
        }
        else {
            this.scrollToField(firstError);
        }

    }

    submitStep(section, goToNext){
        if (!this.editable){
            return;
        }
        //console.log(section);
        const {valid, firstError}=this.service.getValue([section], true);
        //console.log({valid, value, firstError});
        if (valid){
            section.hasError=false;
            section.submited=true;
            //console.log(this.stepper);
            if (goToNext){
                setTimeout(()=>{
                    this.stepper.next();
                }, 100)
            }

        }
        else {
            //console.log(firstError);
            this.scrollToField(firstError);
            section.hasError=true;
            if (firstError && firstError.errors && firstError.errors[0]){
                section.firstErrorText=firstError.label+': '+firstError.errors[0].message;
            }
        }
    }

    ngOnDestroy() {
        //this._bpSub.unsubscribe();
    }

}
