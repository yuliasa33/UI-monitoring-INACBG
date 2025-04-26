import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KotaComponent } from './kota.component';

describe('KotaComponent', () => {
  let component: KotaComponent;
  let fixture: ComponentFixture<KotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KotaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
