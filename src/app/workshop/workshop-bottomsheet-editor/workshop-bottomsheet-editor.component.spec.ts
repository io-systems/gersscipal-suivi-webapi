import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopBottomsheetEditorComponent } from './workshop-bottomsheet-editor.component';

describe('WorkshopBottomsheetEditorComponent', () => {
  let component: WorkshopBottomsheetEditorComponent;
  let fixture: ComponentFixture<WorkshopBottomsheetEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopBottomsheetEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopBottomsheetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
