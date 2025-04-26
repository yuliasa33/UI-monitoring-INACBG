import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEtnisComponent } from './data-etnis.component';

describe('DataEtnisComponent', () => {
  let component: DataEtnisComponent;
  let fixture: ComponentFixture<DataEtnisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataEtnisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataEtnisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
