import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeFileManagerComponent } from './recipe-file-manager.component';

describe('RecipeFileManagerComponent', () => {
  let component: RecipeFileManagerComponent;
  let fixture: ComponentFixture<RecipeFileManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeFileManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeFileManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
