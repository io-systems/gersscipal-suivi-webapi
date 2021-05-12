import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HmiRecipeBottomsheetFormComponent } from './hmi-recipe-bottomsheet-form.component';

describe('HmiRecipeBottomsheetFormComponent', () => {
  let component: HmiRecipeBottomsheetFormComponent;
  let fixture: ComponentFixture<HmiRecipeBottomsheetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HmiRecipeBottomsheetFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HmiRecipeBottomsheetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
