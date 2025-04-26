import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, forwardRef, Input, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  standalone:true,
  imports:[CommonModule,
    InputTextModule,CalendarModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  selector: 'atom-input-fields',
  templateUrl: './atom-input-fields.component.html',
  styleUrls: ['./atom-input-fields.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AtomInputFieldsComponent),
      multi: true,
    },
  ],
})
export class AtomInputFieldsComponent {
  @Input() inputType: string = 'text'; // Type of input (e.g., text, date)
  @Input() Disabled: boolean = false; // Whether the input is disabled
  @Input('min') min?:number
  @Input('max') max?:number
  @Input('value') _value: any ;

  get value() { return this._value; }

    set value(val) {
        this._value = val;
        this.onChange(val);
        this.onTouched();
    }

  private onChange = (value: any) => {
  };
  private onTouched = () => {};

  // Writes a value from the form to the input
  writeValue(value: any): void {
    this.value = value;
  }

  // Registers a function to call when the value changes
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Registers a function to call when the input is touched
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Sets the disabled state of the input
  setDisabledState(isDisabled: boolean): void {
    this.Disabled = isDisabled;
  }

  // Handles changes in the input
  onInput(event: any): void {
    const value = event.target ? event.target.value : event;
    this.value = value;
    this.onChange(value); // Notify the form about the change
  }

  // Handles when the input loses focus
  onBlur(): void {
    this.onTouched();
  }
}
