import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'atom-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atom-toggle.component.html',
  styleUrl: './atom-toggle.component.scss'
})
export class AtomToggleComponent {
  @Input() checked?: boolean = false; // Nilai awal (default: false)
  @Input() label?: string = ''; // Label opsional
  @Output() valueChange = new EventEmitter<boolean>(); // Event emitter untuk perubahan nilai

  // Fungsi untuk menangani perubahan nilai
  onToggleChange(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.checked = isChecked;
    this.valueChange.emit(this.checked); // Emit event ke parent
  }
}
