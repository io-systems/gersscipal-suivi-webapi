import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftModelBottomsheetEditorComponent } from './shift-model-bottomsheet-editor.component';

describe('ShiftModelBottomsheetEditorComponent', () => {
  let component: ShiftModelBottomsheetEditorComponent;
  let fixture: ComponentFixture<ShiftModelBottomsheetEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftModelBottomsheetEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftModelBottomsheetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
