import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSurveyComponent } from './ngx-survey.component';

describe('NgxSurveyComponent', () => {
  let component: NgxSurveyComponent;
  let fixture: ComponentFixture<NgxSurveyComponent>;

  beforeEach(async(() => {
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
