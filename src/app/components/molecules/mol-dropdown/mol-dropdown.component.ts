import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, forwardRef, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';
import { AtomLabelComponent } from '../../atom/atom-label/atom-label.component';


export interface DropdownAttributeModel {
  selectedValue:any
  label:string
  filter:boolean
  placeholder:string,
  Optionlabel:string
  filterBy:any
  OptionValue:any
  datasource:any
}

@Component({
  selector: 'app-mol-dropdown',
  standalone: true,
  imports: [CommonModule,DropdownModule,FormsModule,ReactiveFormsModule,AtomLabelComponent],
  templateUrl: './mol-dropdown.component.html',
  styleUrls: ['./mol-dropdown.component.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class MolDropdownComponent implements OnInit {

  @Input('DropdownAttribute') DropdownAttribute!: DropdownAttributeModel;
  @Input() dataSource!: any[] | any;
  @Input('Labels') Labels:any 
  @Input('Disabled') Disabled = false

  @Output('Change') Change = new EventEmitter()

  value: any;
  isDisabled: boolean = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this; // Connect to Angular Forms API
    }
  }

  ngOnInit(): void {
    
  }

  // ControlValueAccessor implementation
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
    this.isDisabled = isDisabled;
  }

  // Event handler for dropdown value change
  onValueChange(event: any): void {
    this.value = event;
    this.onChange(event);
    this.onTouched();
    this.Change.emit(event)
  }

}
