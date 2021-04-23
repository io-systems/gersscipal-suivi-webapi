import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkstationSelectorComponent } from './workstation-selector.component';

describe('WorkstationSelectorComponent', () => {
  let component: WorkstationSelectorComponent;
  let fixture: ComponentFixture<WorkstationSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkstationSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkstationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
