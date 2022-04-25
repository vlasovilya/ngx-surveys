import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileListItemImageComponent } from './file-list-item-image.component';

describe('FileListItemImageComponent', () => {
  let component: FileListItemImageComponent;
  let fixture: ComponentFixture<FileListItemImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileListItemImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileListItemImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
