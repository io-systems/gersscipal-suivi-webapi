import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageStandardComponent } from './message-standard.component';

describe('MessageStandardComponent', () => {
  let component: MessageStandardComponent;
  let fixture: ComponentFixture<MessageStandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageStandardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
