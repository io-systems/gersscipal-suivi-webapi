import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftScheduleEditorComponent } from './shift-schedule-editor.component';

describe('ShiftScheduleEditorComponent', () => {
  let component: ShiftScheduleEditorComponent;
  let fixture: ComponentFixture<ShiftScheduleEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftScheduleEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftScheduleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
