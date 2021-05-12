import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationCachedAutocompleteComponent } from './operation-cached-autocomplete.component';

describe('OperationCachedAutocompleteComponent', () => {
  let component: OperationCachedAutocompleteComponent;
  let fixture: ComponentFixture<OperationCachedAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationCachedAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationCachedAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
