import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageStandardCachedAutocompleteComponent } from './message-standard-cached-autocomplete.component';

describe('MessageStandardCachedAutocompleteComponent', () => {
  let component: MessageStandardCachedAutocompleteComponent;
  let fixture: ComponentFixture<MessageStandardCachedAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageStandardCachedAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageStandardCachedAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
