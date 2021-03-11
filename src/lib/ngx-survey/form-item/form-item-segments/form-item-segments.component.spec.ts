import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormItemSegmentsComponent } from './form-item-segments.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { testCreditClaimForm } from 'app/modules/qa/testing';

import * as _ from 'lodash';

describe('FormItemSegmentsComponent', () => {
    let component: FormItemSegmentsComponent;
    let fixture: ComponentFixture<FormItemSegmentsComponent>;
    let item=_.cloneDeep(testCreditClaimForm.sections[0].items[0]);

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MatInputModule,
                NoopAnimationsModule,
                MatButtonModule,
                MatButtonToggleModule,
                FormsModule
            ],
            declarations: [ FormItemSegmentsComponent ],
            providers: [

            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormItemSegmentsComponent);
        component = fixture.componentInstance;
        item=_.cloneDeep(testCreditClaimForm.sections[0].items[0]);
        component.item=item;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it('should render '+item.segments.length+' buttons', () => {
        const compiled = fixture.debugElement.nativeElement;
        const segments = [...compiled.querySelector('mat-button-toggle-group').children];
        expect(segments.length).toEqual(item.segments.length);
        segments.forEach(segment=>{
            expect(segment.textContent.trim()).toEqual(item.segments[segments.indexOf(segment)].title);
        })
    });


    it('should render active list option in accordance field value', () => {
        const compiled = fixture.debugElement.nativeElement;
        const segments = [...compiled.querySelector('mat-button-toggle-group').children];
        expect(segments.filter(segment=>[...segment.classList].indexOf('mat-button-toggle-checked') >=0).length).toEqual(0);
        item.value=item.segments[1].title;
        fixture.detectChanges();
        expect(segments[1].classList).toContain('mat-button-toggle-checked');
        expect(segments.filter(segment=>[...segment.classList].indexOf('mat-button-toggle-checked') >=0).length).toEqual(1);
    });


    it('should render 2 error messages', waitForAsync(() => {
        const compiled = fixture.debugElement.nativeElement;
        const errors=[
            {message: 'First Error Message'},
            {message: 'Second Error Message'},
        ];
        expect(compiled.querySelector('mat-error')).toEqual(null);
        expect(compiled.querySelector('mat-button-toggle-group').classList).not.toContain('has-error');

        item.errors=errors;
        fixture.detectChanges();
        expect(compiled.querySelector('mat-button-toggle-group').classList).toContain('has-error');

        errors.forEach(err=>{
            expect(compiled.querySelector('mat-error').children[errors.indexOf(err)].textContent).toEqual(err.message);
        });

    }));


    it('should change the field value by click on list item', () => {
        const compiled = fixture.debugElement.nativeElement;
        const segments = [...compiled.querySelector('mat-button-toggle-group').children];

        expect(segments.filter(segment=>[...segment.classList].indexOf('mat-button-toggle-checked') >=0).length).toEqual(0);

        segments[0].click();
        fixture.detectChanges();

        expect(item.value).toEqual(item.segments[0].title);

        segments[1].click();
        fixture.detectChanges();

        expect(item.value).toEqual(item.segments[1].title);
    });

});
