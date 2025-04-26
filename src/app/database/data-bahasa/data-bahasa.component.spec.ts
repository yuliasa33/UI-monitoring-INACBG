import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBahasaComponent } from './data-bahasa.component';

describe('DataBahasaComponent', () => {
  let component: DataBahasaComponent;
  let fixture: ComponentFixture<DataBahasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataBahasaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataBahasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
