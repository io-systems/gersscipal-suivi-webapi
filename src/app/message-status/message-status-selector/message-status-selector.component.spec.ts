import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageStatusSelectorComponent } from './message-status-selector.component';

describe('MessageStatusSelectorComponent', () => {
  let component: MessageStatusSelectorComponent;
  let fixture: ComponentFixture<MessageStatusSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageStatusSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageStatusSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
