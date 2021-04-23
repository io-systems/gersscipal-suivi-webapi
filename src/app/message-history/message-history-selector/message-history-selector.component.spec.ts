import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageHistorySelectorComponent } from './message-history-selector.component';

describe('MessageHistorySelectorComponent', () => {
  let component: MessageHistorySelectorComponent;
  let fixture: ComponentFixture<MessageHistorySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageHistorySelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageHistorySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
