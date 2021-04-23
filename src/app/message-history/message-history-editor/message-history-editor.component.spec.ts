import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageHistoryEditorComponent } from './message-history-editor.component';

describe('MessageHistoryEditorComponent', () => {
  let component: MessageHistoryEditorComponent;
  let fixture: ComponentFixture<MessageHistoryEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageHistoryEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageHistoryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
