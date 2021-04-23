import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricationOrderSelectorComponent } from './fabrication-order-selector.component';

describe('FabricationOrderSelectorComponent', () => {
  let component: FabricationOrderSelectorComponent;
  let fixture: ComponentFixture<FabricationOrderSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FabricationOrderSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricationOrderSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
