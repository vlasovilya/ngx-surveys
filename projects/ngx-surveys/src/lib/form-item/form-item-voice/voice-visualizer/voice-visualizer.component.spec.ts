import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceVisualizerComponent } from './voice-visualizer.component';

describe('VoiceVisualizerComponent', () => {
  let component: VoiceVisualizerComponent;
  let fixture: ComponentFixture<VoiceVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoiceVisualizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
