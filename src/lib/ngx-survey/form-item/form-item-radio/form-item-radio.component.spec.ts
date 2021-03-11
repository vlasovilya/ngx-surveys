import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormItemRadioComponent } from './form-item-radio.component';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { testCreditClaimForm } from 'app/modules/qa/testing';

import * as _ from 'lodash';

describe('FormItemRadioComponent', () => {
    let component: FormItemRadioComponent;
    let fixture: ComponentFixture<FormItemRadioComponent>;
    let item=_.cloneDeep(testCreditClaimForm.sections[3]);

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MatInputModule,
                NoopAnimationsModule,
                MatListModule,
                FormsModule
            ],
            declarations: [ FormItemRadioComponent ],
            providers: [

            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormItemRadioComponent);
        component = fixture.componentInstance;
        item=_.cloneDeep(testCreditClaimForm.sections[3]);
        component.item=item;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it('should render '+item.items.length+' list items', () => {
        const compiled = fixture.debugElement.nativeElement;
        const options = [...compiled.querySelector('mat-selection-list').children];
        expect(options.length).toEqual(item.items.length);
        options.forEach(option=>{
            expect(option.querySelector('.mat-list-text').textContent.trim()).toEqual(item.items[options.indexOf(option)].title);
        })
    });


    it('should render active list option in accordance field value', () => {
        const compiled = fixture.debugElement.nativeElement;
        const options = [...compiled.querySelector('mat-selection-list').children];
        expect(options.filter(option=>option.getAttribute('aria-selected')==="true").length).toEqual(0);
        item.value=item.items[1].optionValue;
        fixture.detectChanges();
        expect(options[1].getAttribute('aria-selected')).toEqual('true');
        expect(options.filter(option=>option.getAttribute('aria-selected')==="true").length).toEqual(1);
    });

    it('should render active list with MULTIPLE option selected in accordance field value', () => {
        const compiled = fixture.debugElement.nativeElement;
        const options = [...compiled.querySelector('mat-selection-list').children];
        expect(options.filter(option=>option.getAttribute('aria-selected')==="true").length).toEqual(0);
        item.multiple=true;
        item.value=[item.items[1].optionValue, item.items[3].optionValue];
        fixture.detectChanges();
        expect(options[1].getAttribute('aria-selected')).toEqual('true');
        expect(options[3].getAttribute('aria-selected')).toEqual('true');
        expect(options.filter(option=>option.getAttribute('aria-selected')==="true").length).toEqual(2);
    });

    it('should render 2 error messages', waitForAsync(() => {
        const compiled = fixture.debugElement.nativeElement;
        const errors=[
            {message: 'First Error Message'},
            {message: 'Second Error Message'},
        ];
        expect(compiled.querySelector('mat-error')).toEqual(null);

        item.errors=errors;
        fixture.detectChanges();

        errors.forEach(err=>{
            expect(compiled.querySelector('mat-error').children[errors.indexOf(err)].textContent).toEqual(err.message);
        });

    }));

    it('should change the field value by click on list item', () => {
        const compiled = fixture.debugElement.nativeElement;
        const options = [...compiled.querySelector('mat-selection-list').children];

        expect(options.filter(option=>option.getAttribute('aria-selected')==="true").length).toEqual(0);

        options[0].click();
        fixture.detectChanges();

        expect(item.value).toEqual(item.items[0].optionValue);

        options[1].click();
        fixture.detectChanges();

        expect(item.value).toEqual(item.items[1].optionValue);
    });

    it('should change the field value by click on list items in MULTIPLE options mode', () => {
        const compiled = fixture.debugElement.nativeElement;
        const options = [...compiled.querySelector('mat-selection-list').children];

        expect(options.filter(option=>option.getAttribute('aria-selected')==="true").length).toEqual(0);
        item.multiple=true;

        options[0].click();
        fixture.detectChanges();

        expect(item.value).toEqual([item.items[0].optionValue]);

        options[2].click();
        fixture.detectChanges();

        expect(item.value).toEqual([item.items[0].optionValue, item.items[2].optionValue]);

        options[0].click();
        fixture.detectChanges();

        expect(item.value).toEqual([item.items[2].optionValue]);

        options[1].click();
        fixture.detectChanges();

        expect(item.value).toEqual([item.items[2].optionValue, item.items[1].optionValue]);

        options[3].click();
        fixture.detectChanges();

        expect(item.value).toEqual([item.items[2].optionValue, item.items[1].optionValue, item.items[3].optionValue]);
    });

});
