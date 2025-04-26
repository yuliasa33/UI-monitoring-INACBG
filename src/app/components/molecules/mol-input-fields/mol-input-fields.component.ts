import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, forwardRef, Input } from '@angular/core';
import { AtomLabelComponent } from '../../atom/atom-label/atom-label.component';
import { AtomInputFieldsComponent } from '../../atom/atom-input-fields/atom-input-fields.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  standalone:true,
  imports:[CommonModule,
    AtomLabelComponent,
    AtomInputFieldsComponent,
  ],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MolInputFieldsComponent),
        multi: true,
    },
],
  selector: 'app-mol-input-fields',
  templateUrl: './mol-input-fields.component.html',
  styleUrls: ['./mol-input-fields.component.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MolInputFieldsComponent implements ControlValueAccessor {

  @Input('labelValue') labelValue:any = ""
  @Input('inputType') inputType:'text'| 'number' | 'date' = 'text'
  @Input('Disabled') Disabled:boolean = false
  @Input('min') min?:number
  @Input('max') max?:number
  @Input('value') value: string = '';
 

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  // Called by Angular when the model updates the value
  writeValue(value: any): void {
    this.value = value || '';
  }

  // Registers a callback to update the model when the value changes
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Registers a callback for the touched state
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Emits changes when the user types in the input
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value); // Notify Angular forms about the change
  }

}
