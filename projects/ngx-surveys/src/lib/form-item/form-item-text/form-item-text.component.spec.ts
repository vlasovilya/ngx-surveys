import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormItemTextComponent } from './form-item-text.component';
import { MatInputModule } from '@angular/material/input';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { testCreditClaimForm } from 'app/modules/qa/testing';

import * as _ from 'lodash';

describe('FormItemTextComponent', () => {
    let component: FormItemTextComponent;
    let fixture: ComponentFixture<FormItemTextComponent>;
    let item;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MatInputModule,
                NoopAnimationsModule,
                FormsModule
            ],
            declarations: [ FormItemTextComponent ],
            providers: [

            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormItemTextComponent);
        component = fixture.componentInstance;
        item=_.cloneDeep(testCreditClaimForm.sections[0].items[1]);
        component.item=item;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render field placeholder as a material label', () => {
        const compiled = fixture.debugElement.nativeElement;
        const placeholder='Test Date Title';
        item.placeholder=placeholder;
        fixture.detectChanges();
        const input=compiled.querySelector('textarea');
        const label=compiled.querySelector('.mat-form-field-label-wrapper > label.mat-form-field-label');
        expect(input.getAttribute('data-placeholder')).toEqual(placeholder);
        expect(label.textContent).toEqual(placeholder);
    });



    it('should render field value', waitForAsync(() => {
        const compiled = fixture.debugElement.nativeElement;
        const value='Test Field Value';
        item.value=value;
        fixture.detectChanges();
        setTimeout(()=>{
            fixture.detectChanges();
            const input=compiled.querySelector('textarea');
            expect(input.value).toEqual(value);
            expect(compiled.querySelector('.mat-form-field').classList).not.toContain('mat-form-field-invalid');
        }, 500);
    }));


    it('should render 2 error messages', waitForAsync(() => {
        const compiled = fixture.debugElement.nativeElement;
        const errors=[
            {message: 'First Error Message'},
            {message: 'Second Error Message'},
        ];
        const value='Test Field Value';
        item.value=value;
        item.errors=errors;
        fixture.detectChanges();
        setTimeout(()=>{
            fixture.detectChanges();
            const input=compiled.querySelector('textarea');
            expect(input.value).toEqual(value);
            expect(compiled.querySelector('.mat-form-field').classList).toContain('mat-form-field-invalid');
            errors.forEach(err=>{
                expect(compiled.querySelector('mat-error').children[errors.indexOf(err)].textContent).toEqual(err.message);
            });
        }, 500);
    }));


    it('should set field as disabled when component is not editable', waitForAsync(() => {
        const compiled = fixture.debugElement.nativeElement;
        const input=compiled.querySelector('textarea');
        expect(input.getAttribute('disabled')).toEqual(null);
        component.editable=false;
        fixture.detectChanges();
        setTimeout(()=>{
            fixture.detectChanges();
            expect(input.getAttribute('disabled')).toEqual('');
        }, 500);

    }));


});
