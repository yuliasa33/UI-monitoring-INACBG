import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDebiturComponent } from './data-debitur.component';

describe('DataDebiturComponent', () => {
  let component: DataDebiturComponent;
  let fixture: ComponentFixture<DataDebiturComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataDebiturComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataDebiturComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
