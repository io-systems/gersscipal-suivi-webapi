import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageHistoryFileManagerComponent } from './message-history-file-manager.component';

describe('MessageHistoryFileManagerComponent', () => {
  let component: MessageHistoryFileManagerComponent;
  let fixture: ComponentFixture<MessageHistoryFileManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageHistoryFileManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageHistoryFileManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
