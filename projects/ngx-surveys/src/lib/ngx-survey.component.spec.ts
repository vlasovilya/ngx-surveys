import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NgxSurveyComponent } from './ngx-survey.component';

describe('NgxSurveyComponent', () => {
  let component: NgxSurveyComponent;
  let fixture: ComponentFixture<NgxSurveyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
