import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormItemDateComponent } from './form-item-date.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { testCreditClaimForm } from 'app/modules/qa/testing';

import * as _ from 'lodash';

describe('FormItemDateComponent', () => {
    let component: FormItemDateComponent;
    let fixture: ComponentFixture<FormItemDateComponent>;
    let item;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MatInputModule,
                MatDatepickerModule,
                MatNativeDateModule,
                NoopAnimationsModule,
                FormsModule
            ],
            declarations: [ FormItemDateComponent ],
            providers: [

            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormItemDateComponent);
        component = fixture.componentInstance;
        item=_.cloneDeep(testCreditClaimForm.sections[0].items[2]);
        component.item=item;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render field title as a material label and placeholder', () => {
        const compiled = fixture.debugElement.nativeElement;
        const title='Test Date Title';
        item.title=title;
        fixture.detectChanges();
        const input=compiled.querySelector('input.mat-input-element');
        const label=compiled.querySelector('.mat-form-field-label-wrapper > label.mat-form-field-label');
        expect(input.getAttribute('data-placeholder')).toEqual(title);
        expect(label.textContent).toEqual(title);
    });

    it('should render field placeholder as a material hint', () => {
        const compiled = fixture.debugElement.nativeElement;
        const hint='Test Date Placeholder';
        item.placeholder=hint;
        fixture.detectChanges();
        expect(compiled.querySelector('.mat-form-field-hint-wrapper > mat-hint > strong').textContent).toEqual(hint);
    });

    it('should render datepicker button as a form field suffix', waitForAsync(() => {
        const compiled = fixture.debugElement.nativeElement;
        const value='2000-01-20';
        item.value=value;
        fixture.detectChanges();
        expect(compiled.querySelector('.mat-form-field-suffix > mat-datepicker-toggle > button')).not.toEqual(null);
    }));


    it('should convert and render date value', waitForAsync(() => {
        const compiled = fixture.debugElement.nativeElement;
        const value='2000-01-20';
        item.value=value;
        fixture.detectChanges();
        setTimeout(()=>{
            fixture.detectChanges();
            const input=compiled.querySelector('input.mat-input-element');
            expect(input.value).toEqual('1/20/2000');
            expect(compiled.querySelector('.mat-form-field').classList).not.toContain('mat-form-field-invalid');
        }, 500);
    }));


    it('should render 2 error messages', waitForAsync(() => {
        const compiled = fixture.debugElement.nativeElement;
        const errors=[
            {message: 'First Error Message'},
            {message: 'Second Error Message'},
        ];
        const value='2000-01-20';
        item.value=value;
        item.errors=errors;
        fixture.detectChanges();
        setTimeout(()=>{
            fixture.detectChanges();
            const input=compiled.querySelector('input.mat-input-element');
            expect(input.value).toEqual('1/20/2000');
            expect(compiled.querySelector('.mat-form-field').classList).toContain('mat-form-field-invalid');
            errors.forEach(err=>{
                expect(compiled.querySelector('mat-error').children[errors.indexOf(err)].textContent).toEqual(err.message);
            });
        }, 500);
    }));


    it('should set field as disabled when it`s not empty and read only', () => {
        const compiled = fixture.debugElement.nativeElement;
        const input=compiled.querySelector('input.mat-input-element');
        expect(input.getAttribute('disabled')).toEqual(null);
        const value='2000-01-20';
        item.value=value;
        item.readOnly=true;
        fixture.detectChanges();
        expect(input.getAttribute('disabled')).toEqual('');
    });


    it('should set field as disabled when component is not editable', () => {
        const compiled = fixture.debugElement.nativeElement;
        const input=compiled.querySelector('input.mat-input-element');
        expect(input.getAttribute('disabled')).toEqual(null);
        component.editable=false;
        fixture.detectChanges();
        expect(input.getAttribute('disabled')).toEqual('');
    });


});
