import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileListItemVideoComponent } from './file-list-item-video.component';

describe('FileListItemVideoComponent', () => {
  let component: FileListItemVideoComponent;
  let fixture: ComponentFixture<FileListItemVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileListItemVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileListItemVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
