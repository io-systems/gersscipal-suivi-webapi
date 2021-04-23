import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricationOrderBottomsheetEditorComponent } from './fabrication-order-bottomsheet-editor.component';

describe('FabricationOrderBottomsheetEditorComponent', () => {
  let component: FabricationOrderBottomsheetEditorComponent;
  let fixture: ComponentFixture<FabricationOrderBottomsheetEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FabricationOrderBottomsheetEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricationOrderBottomsheetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
