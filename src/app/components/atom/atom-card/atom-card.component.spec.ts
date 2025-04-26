import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtomCardComponent } from './atom-card.component';

describe('AtomCardComponent', () => {
  let component: AtomCardComponent;
  let fixture: ComponentFixture<AtomCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtomCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtomCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
