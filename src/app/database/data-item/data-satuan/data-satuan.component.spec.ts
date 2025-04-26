import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSatuanComponent } from './data-satuan.component';

describe('DataSatuanComponent', () => {
  let component: DataSatuanComponent;
  let fixture: ComponentFixture<DataSatuanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataSatuanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataSatuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
