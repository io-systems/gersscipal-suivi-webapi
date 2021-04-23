import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkstationBottomsheetEditorComponent } from './workstation-bottomsheet-editor.component';

describe('WorkstationBottomsheetEditorComponent', () => {
  let component: WorkstationBottomsheetEditorComponent;
  let fixture: ComponentFixture<WorkstationBottomsheetEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkstationBottomsheetEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkstationBottomsheetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
