import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtomToggleComponent } from './atom-toggle.component';

describe('AtomToggleComponent', () => {
  let component: AtomToggleComponent;
  let fixture: ComponentFixture<AtomToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtomToggleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtomToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
