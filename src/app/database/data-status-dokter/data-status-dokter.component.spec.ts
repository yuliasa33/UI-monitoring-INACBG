import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataStatusDokterComponent } from './data-status-dokter.component';

describe('DataStatusDokterComponent', () => {
  let component: DataStatusDokterComponent;
  let fixture: ComponentFixture<DataStatusDokterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataStatusDokterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataStatusDokterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
