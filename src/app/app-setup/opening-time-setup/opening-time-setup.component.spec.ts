import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningTimeSetupComponent } from './opening-time-setup.component';

describe('OpeningTimeSetupComponent', () => {
  let component: OpeningTimeSetupComponent;
  let fixture: ComponentFixture<OpeningTimeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpeningTimeSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningTimeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
