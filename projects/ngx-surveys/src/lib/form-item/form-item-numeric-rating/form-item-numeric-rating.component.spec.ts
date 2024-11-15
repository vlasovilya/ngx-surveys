import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormItemNumericRatingComponent } from './form-item-numeric-rating.component';
import { MatInputModule } from '@angular/material/input';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { testCreditClaimForm } from 'app/modules/qa/testing';

import * as _ from 'lodash';

describe('FormItemNumericRatingComponent', () => {
    let component: FormItemNumericRatingComponent;
    let fixture: ComponentFixture<FormItemNumericRatingComponent>;
    let item;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MatInputModule,
                NoopAnimationsModule,
                FormsModule
            ],
            declarations: [ FormItemNumericRatingComponent ],
            providers: [

            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormItemNumericRatingComponent);
        component = fixture.componentInstance;
        item=_.cloneDeep(testCreditClaimForm.sections[0].items[1]);
        component.item=item;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should field label', () => {
        const compiled = fixture.debugElement.nativeElement;
        const title='Test Field Title';
        item.title=title;
        fixture.detectChanges();
        expect(compiled.querySelector('.rating-set .rating-set-title').textContent).toEqual(title);
    });

    it('should render 11 rating buttons', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect([...compiled.querySelector('.rating-set .rating-set-buttons').children].length).toEqual(11);
    });

    it('should render active button in accordance field value', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.rating-set .rating-set-buttons button.btn-primary')).toEqual(null);
        item.value=5;
        fixture.detectChanges();
        expect(compiled.querySelector('.rating-set .rating-set-buttons button.btn-primary').textContent).toEqual("5");
    });

    it('should render 2 error messages', waitForAsync(() => {
        const compiled = fixture.debugElement.nativeElement;
        const errors=[
            {message: 'First Error Message'},
            {message: 'Second Error Message'},
        ];
        expect(compiled.querySelector('mat-error')).toEqual(null);
        item.value=7;
        item.errors=errors;
        fixture.detectChanges();

        errors.forEach(err=>{
            expect(compiled.querySelector('mat-error').children[errors.indexOf(err)].textContent).toEqual(err.message);
        });
        expect(compiled.querySelector('.rating-set .rating-set-buttons button.btn-primary').textContent).toEqual("7");
    }));

    it('should change the field value by click on rating button', () => {
        const compiled = fixture.debugElement.nativeElement;

        expect(compiled.querySelector('.rating-set .rating-set-buttons button.btn-primary')).toEqual(null);

        compiled.querySelector('.rating-set .rating-set-buttons').children[6].click();
        fixture.detectChanges();

        expect(item.value).toEqual(6);
    });
});
