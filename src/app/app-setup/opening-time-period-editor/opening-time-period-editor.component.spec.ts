import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningTimePeriodEditorComponent } from './opening-time-period-editor.component';

describe('OpeningTimePeriodEditorComponent', () => {
  let component: OpeningTimePeriodEditorComponent;
  let fixture: ComponentFixture<OpeningTimePeriodEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpeningTimePeriodEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningTimePeriodEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
