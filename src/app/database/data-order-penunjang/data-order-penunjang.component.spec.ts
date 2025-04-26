import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataOrderPenunjangComponent } from './data-order-penunjang.component';

describe('DataOrderPenunjangComponent', () => {
  let component: DataOrderPenunjangComponent;
  let fixture: ComponentFixture<DataOrderPenunjangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataOrderPenunjangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataOrderPenunjangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
