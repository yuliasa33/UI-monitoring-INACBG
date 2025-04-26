import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'atom-card',
  standalone: true,
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
  templateUrl: './atom-card.component.html',
  styleUrl: './atom-card.component.scss'
})
export class AtomCardComponent {

}
