import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';

import { StarRatingComponent } from './star-rating.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('StarRatingComponent', () => {
    let component: StarRatingComponent;
    let fixture: ComponentFixture<StarRatingComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MatButtonModule,
                MatTooltipModule,
                MatIconModule,
                MatInputModule,
                MatSnackBarModule
            ],
            declarations: [ StarRatingComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StarRatingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should render error message when star count is not provided', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.mat-error').textContent).toContain('Star count is required and cannot be zero');
    });

    it('should render rating widget and change the value after click on star', () => {
        const compiled = fixture.debugElement.nativeElement;
        component.starCount=7;
        component.rating=3;
        component.color='primary';
        spyOn(component.ratingUpdated, 'emit');
        component.ngOnInit();
        fixture.detectChanges();

        const starButtons=[...compiled.children];

        expect(compiled.querySelector('.mat-error')).toEqual(null);
        expect(starButtons.length).toEqual(component.starCount);
        expect(starButtons.filter(btn=>btn.querySelector('mat-icon').textContent.trim()==='star').length).toEqual(component.rating);
        expect(starButtons.filter(btn=>btn.querySelector('mat-icon').textContent.trim()==='star_border').length).toEqual(component.starCount-component.rating);

        starButtons[component.starCount-1].click();
        fixture.detectChanges();

        expect(component.rating).toEqual(component.starCount);
        expect(component.ratingUpdated.emit).toHaveBeenCalledWith(component.starCount);

        starButtons[component.starCount-3].click();
        fixture.detectChanges();

        expect(component.rating).toEqual(component.starCount-2);
        expect(component.ratingUpdated.emit).toHaveBeenCalledWith(component.starCount-2);

        expect(starButtons.filter(btn=>btn.querySelector('mat-icon').textContent.trim()==='star').length).toEqual(component.rating);
        expect(starButtons.filter(btn=>btn.querySelector('mat-icon').textContent.trim()==='star_border').length).toEqual(component.starCount-component.rating);

    });
});
