import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAsalRujukanComponent } from './data-asal-rujukan.component';

describe('DataAsalRujukanComponent', () => {
  let component: DataAsalRujukanComponent;
  let fixture: ComponentFixture<DataAsalRujukanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataAsalRujukanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataAsalRujukanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
