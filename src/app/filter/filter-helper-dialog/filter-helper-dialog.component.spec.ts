import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterHelperDialogComponent } from './filter-helper-dialog.component';

describe('FilterHelperPopupComponent', () => {
  let component: FilterHelperDialogComponent;
  let fixture: ComponentFixture<FilterHelperDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterHelperDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterHelperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
