import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'atom-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atom-label.component.html',
  styleUrls: ['./atom-label.component.scss']
})
export class AtomLabelComponent {
  @Input('labelValue')labelValue:any
}
