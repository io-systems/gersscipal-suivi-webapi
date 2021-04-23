import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageStatusBottomsheetEditorComponent } from './message-status-bottomsheet-editor.component';

describe('MessageStatusBottomsheetEditorComponent', () => {
  let component: MessageStatusBottomsheetEditorComponent;
  let fixture: ComponentFixture<MessageStatusBottomsheetEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageStatusBottomsheetEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageStatusBottomsheetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
