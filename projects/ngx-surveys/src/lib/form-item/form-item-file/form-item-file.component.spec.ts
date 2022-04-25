import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemFileComponent } from './form-item-file.component';

describe('FormItemFileComponent', () => {
  let component: FormItemFileComponent;
  let fixture: ComponentFixture<FormItemFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormItemFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
