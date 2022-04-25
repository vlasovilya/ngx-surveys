import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileListItemFileComponent } from './file-list-item-file.component';

describe('FileListItemFileComponent', () => {
  let component: FileListItemFileComponent;
  let fixture: ComponentFixture<FileListItemFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileListItemFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileListItemFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
