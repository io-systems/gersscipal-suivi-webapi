import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaInfoDialogComponent } from './schema-info-dialog.component';

describe('SchemaInfoDialogComponent', () => {
  let component: SchemaInfoDialogComponent;
  let fixture: ComponentFixture<SchemaInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemaInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
