import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationBottomSheetEditorComponent } from './operation-bottom-sheet-editor.component';

describe('OperationBottomSheetEditorComponent', () => {
  let component: OperationBottomSheetEditorComponent;
  let fixture: ComponentFixture<OperationBottomSheetEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationBottomSheetEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationBottomSheetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
