import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricationOrderComponent } from './fabrication-order.component';

describe('FabricationOrderComponent', () => {
  let component: FabricationOrderComponent;
  let fixture: ComponentFixture<FabricationOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FabricationOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricationOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
