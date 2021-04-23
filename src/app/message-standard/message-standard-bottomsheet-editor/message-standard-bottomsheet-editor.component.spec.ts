import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageStandardBottomsheetEditorComponent } from './message-standard-bottomsheet-editor.component';

describe('MessageStandardBottomsheetEditorComponent', () => {
  let component: MessageStandardBottomsheetEditorComponent;
  let fixture: ComponentFixture<MessageStandardBottomsheetEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageStandardBottomsheetEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageStandardBottomsheetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
