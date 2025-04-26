import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MolInputFieldsComponent } from './mol-input-fields.component';

describe('MolInputFieldsComponent', () => {
  let component: MolInputFieldsComponent;
  let fixture: ComponentFixture<MolInputFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MolInputFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MolInputFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
