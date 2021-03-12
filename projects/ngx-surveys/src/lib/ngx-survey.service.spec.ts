import { TestBed } from '@angular/core/testing';

import { NgxSurveyService } from './ngx-survey.service';

describe('NgxSurveyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxSurveyService = TestBed.get(NgxSurveyService);
    expect(service).toBeTruthy();
  });
});
