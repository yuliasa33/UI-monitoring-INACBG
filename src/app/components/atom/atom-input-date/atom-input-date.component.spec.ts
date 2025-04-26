import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtomInputDateComponent } from './atom-input-date.component';

describe('AtomInputDateComponent', () => {
  let component: AtomInputDateComponent;
  let fixture: ComponentFixture<AtomInputDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtomInputDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtomInputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
