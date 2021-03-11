import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxSurveyService } from './ngx-survey.service';

@Component({
  selector: 'ngx-survey',
  templateUrl: './ngx-survey.component.html',
  styleUrls: ['./ngx-survey.component.scss']
})
export class NgxSurveyComponent implements OnInit {

    @Input() form:any[];
    @Input() value:any={};
    @Output() valueChange = new EventEmitter<any>();
    @Output() submit = new EventEmitter<any>();


    public editable:boolean=true;

    constructor(
        public service: NgxSurveyService,
    ) { }

    ngOnInit() {
        this.form=this.service.initForm(this.form, this.value);
    }

    scrollToField(field) {
        let el = document.getElementById('form_item_' + field.name);
        if (el){
            el.scrollIntoView();
        }
    };

/*
    getDateStr(time) {
        time = time / 1000000;
        return moment.utc(time).format("MM/DD/YYYY");
    };

    getDateValue(str) {
        var dt = new Date(str);
        dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());

        return dt;
    };






    setItemValue(item, value) {
        item.value = item.multiple ? _.contains(item.value || [], value) ? _.without(item.value, value) : _.union(item.value || [], [value]) : value;
    };

    isSelected(item, value) {
        return item.multiple ? _.contains(item.value || [], value) : item.value === value;
    };
*/

    onItemChanges(item) {
        item.errors=this.service.getErrors(item);
        console.log(item);
        const formValue=this.service.getValue(this.form, false);
        console.log(formValue);
        this.valueChange.emit(formValue.value);
    }


    submitForm(){

        const {valid, value, firstError}=this.service.getValue(this.form, true);
        console.log(value, firstError);
        if (valid){
            this.submit.emit(value);
        }
        else {
            this.scrollToField(firstError);
        }


        /*
        this.formSubmitted = true;
        this.globalError = null;
        let formValues = {};
        let valid = true;
        let firstError;
        _.each(_.filter(this.form, (section)=>this.getSectionVisible(this.form, section)), (section)=>{
            _.each(_.filter(section.items, (item)=>this.getItemVisible(this.form, section, item)), (item)=>{
                formValues[item.name] = _.isArray(item.value) ? JSON.stringify(item.value) : item.value;
                item.errors = this.getErrors(item);
                if (item.errors && item.errors.length) {
                    if (!firstError) {
                        firstError = item;
                    }
                    valid = false;
                }
            });
        });
        formValues = _.extend(this.defaultValues, formValues);
        formValues['deleted'] = undefined;
        if (this.credit && this.credit.id) {
            formValues['id'] = this.credit.id;
        }
        if (!valid) {
            this.scrollToField(firstError);
        }
        //console.log(valid, this.editable, this.form);
        if (valid && this.editable) {
            formValues['dob'] = formValues['dob'] ? this.getDateValue(formValues['dob']) : null;
            //console.log(formValues);
            this.isFormSubmitting = true;

            rxsync.waterfall([
                ()=>this.parse.call('qa', 'claim-credits', {
                    collectionId: this.collection.id,
                    productId: this.product.id,
                    form: formValues,
                    creditId: this.credit ? this.credit.id: undefined,
                }),
                (credit)=>this.service.dataSync().pipe(map(()=>credit)),
                (parseCredit)=>this.creditModel.assignParseObject(parseCredit),
                (credit)=>this.creditModel.save(credit),
            ]).subscribe(credit=>{
                //console.log(credit);
                this.isFormSubmitting = false;
                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = {
                    title: 'Credits',
                    content: this.successMessage,
                    buttons: {
                        proceed: {
                            text: 'Ok',
                            type: 'primary'
                        },
                    },
                };

                const dialogRef = this.dialog.open(DialogBodyComponent, dialogConfig);
                dialogRef.afterClosed().subscribe(result => {
                    this.router.navigate(['../'+(this.credit && this.credit.id ? '../' : '')], {relativeTo:this.route});
                });
                this.analyticsService.save('qa', 'Submitted Credit Claim', {
                    productId: this.product.id,
                    collectionId: this.collection.id,
                });
                this.service.syncCollection('UserCreditItem').subscribe(res=>{
                    //console.log(res);
                });
                this.parse.refreshActiveUserRecord().subscribe(res=>{

                })

            }, (err)=>{
                //console.log(err);
                this.isFormSubmitting = false;
                this.globalError = err.name;
            });

        }
        return false;
        */
    }

}
