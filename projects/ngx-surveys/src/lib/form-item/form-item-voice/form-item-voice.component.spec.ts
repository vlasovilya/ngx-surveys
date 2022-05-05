import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemVoiceComponent } from './form-item-voice.component';

describe('FormItemVoiceComponent', () => {
  let component: FormItemVoiceComponent;
  let fixture: ComponentFixture<FormItemVoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormItemVoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemVoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
