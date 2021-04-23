import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricationOrderEditorComponent } from './fabrication-order-editor.component';

describe('FabricationOrderEditorComponent', () => {
  let component: FabricationOrderEditorComponent;
  let fixture: ComponentFixture<FabricationOrderEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FabricationOrderEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricationOrderEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
