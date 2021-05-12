import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HmiRecipeFormComponent } from './hmi-recipe-form.component';

describe('HmiRecipeFormComponent', () => {
  let component: HmiRecipeFormComponent;
  let fixture: ComponentFixture<HmiRecipeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HmiRecipeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HmiRecipeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
