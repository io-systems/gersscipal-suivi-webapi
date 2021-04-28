import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLinksComponent } from './app-links.component';

describe('AppLinksComponent', () => {
  let component: AppLinksComponent;
  let fixture: ComponentFixture<AppLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
