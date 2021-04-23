import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageHistoryBottomsheetEditorComponent } from './message-history-bottomsheet-editor.component';

describe('MessageHistoryBottomsheetEditorComponent', () => {
  let component: MessageHistoryBottomsheetEditorComponent;
  let fixture: ComponentFixture<MessageHistoryBottomsheetEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageHistoryBottomsheetEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageHistoryBottomsheetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
