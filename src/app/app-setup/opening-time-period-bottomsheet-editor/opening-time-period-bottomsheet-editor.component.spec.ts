import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningTimePeriodBottomsheetEditorComponent } from './opening-time-period-bottomsheet-editor.component';

describe('OpeningTimePeriodBottomsheetEditorComponent', () => {
  let component: OpeningTimePeriodBottomsheetEditorComponent;
  let fixture: ComponentFixture<OpeningTimePeriodBottomsheetEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpeningTimePeriodBottomsheetEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningTimePeriodBottomsheetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
