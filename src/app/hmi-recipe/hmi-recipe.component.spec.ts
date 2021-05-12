import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IhmRecipeComponent } from './ihm-recipe.component';

describe('IhmRecipeComponent', () => {
  let component: IhmRecipeComponent;
  let fixture: ComponentFixture<IhmRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IhmRecipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IhmRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
