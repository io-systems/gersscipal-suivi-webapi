import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkstationEditorComponent } from './workstation-editor.component';

describe('WorkstationEditorComponent', () => {
  let component: WorkstationEditorComponent;
  let fixture: ComponentFixture<WorkstationEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkstationEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkstationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
