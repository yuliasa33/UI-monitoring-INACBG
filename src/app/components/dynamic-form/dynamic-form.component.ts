import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule,DropdownModule,FormsModule,ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {

  @Input() formConfig: any[] = []; // Configuration for dynamic fields
  dynamicForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    const formGroupConfig: any = {};
    this.formConfig.forEach((field) => {
      formGroupConfig[field.name] = [
        field.value || '',
        field.validators || [],
      ];
    });
    this.dynamicForm = this.fb.group(formGroupConfig);
  }

  onSubmit() {
    if (this.dynamicForm.valid) {
      console.log('Form Value:', this.dynamicForm.value);
    } else {
      console.error('Form Invalid');
    }
  }
}
