import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatalAdmisiComponent } from './batal-admisi.component';

describe('BatalAdmisiComponent', () => {
  let component: BatalAdmisiComponent;
  let fixture: ComponentFixture<BatalAdmisiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatalAdmisiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BatalAdmisiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
