import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageStandardSelectorComponent } from './message-standard-selector.component';

describe('MessageStandardSelectorComponent', () => {
  let component: MessageStandardSelectorComponent;
  let fixture: ComponentFixture<MessageStandardSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageStandardSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageStandardSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
