import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEducationComponent } from './data-education.component';

describe('DataEducationComponent', () => {
  let component: DataEducationComponent;
  let fixture: ComponentFixture<DataEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataEducationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
