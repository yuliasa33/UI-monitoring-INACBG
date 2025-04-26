import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSmfComponent } from './data-smf.component';

describe('DataSmfComponent', () => {
  let component: DataSmfComponent;
  let fixture: ComponentFixture<DataSmfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataSmfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataSmfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
