import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemLabelComponent } from './form-item-label.component';

describe('FormItemLabelComponent', () => {
  let component: FormItemLabelComponent;
  let fixture: ComponentFixture<FormItemLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormItemLabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormItemLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
