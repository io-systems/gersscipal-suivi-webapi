import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopSelectorComponent } from './workshop-selector.component';

describe('WorkshopSelectorComponent', () => {
  let component: WorkshopSelectorComponent;
  let fixture: ComponentFixture<WorkshopSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
