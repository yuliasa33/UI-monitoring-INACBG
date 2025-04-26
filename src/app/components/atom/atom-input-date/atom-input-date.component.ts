import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-atom-input-date',
  standalone: true,
  imports: [CalendarModule,CommonModule,ReactiveFormsModule],
  templateUrl: './atom-input-date.component.html',
  styleUrl: './atom-input-date.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AtomInputDateComponent),
      multi: true
    }
  ]
})
export class AtomInputDateComponent {
  @Input() placeholder: string = '';
  @Input() dateFormat: string = 'yy-mm-dd';
  @Input() showIcon: boolean = true;

  value: Date | null = null;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Add if you want to handle disabled state
  }

  onValueChange(event: any) {
    this.value = event;
    this.onChange(event);
    this.onTouched();
  }
}
