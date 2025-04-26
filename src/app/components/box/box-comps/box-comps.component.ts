import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-box-comps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './box-comps.component.html',
  styleUrls: ['./box-comps.component.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class BoxCompsComponent {

}
