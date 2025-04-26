import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtomLabelComponent } from './atom-label.component';

describe('AtomLabelComponent', () => {
  let component: AtomLabelComponent;
  let fixture: ComponentFixture<AtomLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AtomLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtomLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
