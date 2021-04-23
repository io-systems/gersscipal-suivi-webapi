import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageStatusEditorComponent } from './message-status-editor.component';

describe('MessageStatusEditorComponent', () => {
  let component: MessageStatusEditorComponent;
  let fixture: ComponentFixture<MessageStatusEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageStatusEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageStatusEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
