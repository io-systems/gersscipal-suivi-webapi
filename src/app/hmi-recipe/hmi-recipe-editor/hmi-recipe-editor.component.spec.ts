import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HmiRecipeEditorComponent } from './hmi-recipe-editor.component';

describe('HmiRecipeEditorComponent', () => {
  let component: HmiRecipeEditorComponent;
  let fixture: ComponentFixture<HmiRecipeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HmiRecipeEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HmiRecipeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
