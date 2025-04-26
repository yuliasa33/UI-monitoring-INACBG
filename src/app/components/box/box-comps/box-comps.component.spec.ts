import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxCompsComponent } from './box-comps.component';

describe('BoxCompsComponent', () => {
  let component: BoxCompsComponent;
  let fixture: ComponentFixture<BoxCompsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BoxCompsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxCompsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
