import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageStandardEditorComponent } from './message-standard-editor.component';

describe('MessageStandardEditorComponent', () => {
  let component: MessageStandardEditorComponent;
  let fixture: ComponentFixture<MessageStandardEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageStandardEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageStandardEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
