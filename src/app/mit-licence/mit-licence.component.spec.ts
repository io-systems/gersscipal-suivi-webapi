import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitLicenceComponent } from './mit-licence.component';

describe('MitLicenceComponent', () => {
  let component: MitLicenceComponent;
  let fixture: ComponentFixture<MitLicenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MitLicenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MitLicenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
