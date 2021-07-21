import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftModelEditorComponent } from './shift-model-editor.component';

describe('ShiftModelEditorComponent', () => {
  let component: ShiftModelEditorComponent;
  let fixture: ComponentFixture<ShiftModelEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftModelEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftModelEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
