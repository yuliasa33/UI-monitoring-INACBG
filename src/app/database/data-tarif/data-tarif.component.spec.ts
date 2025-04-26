import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTarifComponent } from './data-tarif.component';

describe('DataTarifComponent', () => {
  let component: DataTarifComponent;
  let fixture: ComponentFixture<DataTarifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DataTarifComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTarifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
