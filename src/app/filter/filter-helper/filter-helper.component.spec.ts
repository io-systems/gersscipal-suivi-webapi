import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterHelperComponent } from './filter-helper.component';

describe('FilterHelperComponent', () => {
  let component: FilterHelperComponent;
  let fixture: ComponentFixture<FilterHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterHelperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
