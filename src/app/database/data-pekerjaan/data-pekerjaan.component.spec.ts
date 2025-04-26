import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPekerjaanComponent } from './data-pekerjaan.component';

describe('DataPekerjaanComponent', () => {
  let component: DataPekerjaanComponent;
  let fixture: ComponentFixture<DataPekerjaanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataPekerjaanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataPekerjaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
