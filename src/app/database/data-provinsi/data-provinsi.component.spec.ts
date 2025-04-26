import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProvinsiComponent } from './data-provinsi.component';

describe('DataProvinsiComponent', () => {
  let component: DataProvinsiComponent;
  let fixture: ComponentFixture<DataProvinsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DataProvinsiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataProvinsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
