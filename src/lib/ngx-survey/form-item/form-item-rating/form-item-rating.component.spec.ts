import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormItemRatingComponent } from './form-item-rating.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { testCreditClaimForm } from 'app/modules/qa/testing';

import * as _ from 'lodash';

describe('FormItemRatingComponent', () => {
    let component: FormItemRatingComponent;
    let fixture: ComponentFixture<FormItemRatingComponent>;
    let item;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MatInputModule,
                SharedModule,
                NoopAnimationsModule,
                FormsModule,
                MatIconModule
            ],
            declarations: [ FormItemRatingComponent ],
            providers: [

            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormItemRatingComponent);
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

    it('should render 5 rating star buttons', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect([...compiled.querySelector('mat-star-rating').children].length).toEqual(5);
    });

    it('should render active star button in accordance field value', () => {
        const compiled = fixture.debugElement.nativeElement;
        const starButtons=[...compiled.querySelector('mat-star-rating').children];
        expect(starButtons.filter(btn=>btn.querySelector('mat-icon').textContent.trim()==='star').length).toEqual(0);
        item.value=3;
        fixture.detectChanges();

        expect(starButtons.filter(btn=>btn.querySelector('mat-icon').textContent.trim()==='star').length).toEqual(item.value);
        expect(starButtons.filter(btn=>btn.querySelector('mat-icon').textContent.trim()==='star_border').length).toEqual(5-item.value);

    });

    it('should render 2 error messages', waitForAsync(() => {
        const compiled = fixture.debugElement.nativeElement;
        const starButtons=[...compiled.querySelector('mat-star-rating').children];
        const errors=[
            {message: 'First Error Message'},
            {message: 'Second Error Message'},
        ];
        expect(compiled.querySelector('mat-error')).toEqual(null);
        item.value=2;
        item.errors=errors;
        fixture.detectChanges();

        errors.forEach(err=>{
            expect(compiled.querySelector('mat-error').children[errors.indexOf(err)].textContent).toEqual(err.message);
        });

        expect(starButtons.filter(btn=>btn.querySelector('mat-icon').textContent.trim()==='star').length).toEqual(item.value);
        expect(starButtons.filter(btn=>btn.querySelector('mat-icon').textContent.trim()==='star_border').length).toEqual(5-item.value);
    }));

    it('should change the field value by click on rating button', () => {
        const compiled = fixture.debugElement.nativeElement;
        const starButtons=[...compiled.querySelector('mat-star-rating').children];

        expect(starButtons.filter(btn=>btn.querySelector('mat-icon').textContent.trim()==='star').length).toEqual(0);

        starButtons[3].click();
        fixture.detectChanges();

        expect(item.value).toEqual(4);
    });
});
