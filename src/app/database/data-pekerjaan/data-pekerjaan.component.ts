import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { LayoutComponent } from 'src/app/components/layout/layout.component';
import { MolTableComponent } from 'src/app/components/molecules/mol-table/mol-table.component';
import { TableProps } from 'src/app/components/models/tableProps.model';
import { BaseFormTableComponent } from 'src/app/shared/base-form-model.component';
import { JobTypeModel } from 'src/app/shared/model/setup-tipe-pekerjaan.model';
import { JobTypeService } from '../services/data-job-type/job-type.service';

@Component({
  selector: 'app-data-pekerjaan',
  standalone: true,
  imports: [LayoutComponent, MolTableComponent, CommonModule, DialogModule, ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './data-pekerjaan.component.html',
  styleUrl: './data-pekerjaan.component.scss'
})
export class DataPekerjaanComponent extends BaseFormTableComponent<JobTypeModel> implements OnInit {
  formFields = {
    id_job_type: [0, []],
    job_type: ['', [Validators.required]],
  };

  tableColumns: TableProps.FieldTable[] = [
    { field: 'job_type', header: 'Job Type' },
  ];

  entityName = 'Tipe Pekerjaan';
  id = 'id_job_type'
  service: JobTypeService;

  constructor(
    formBuilder: FormBuilder,
    utilityService: UtilityService,
    jobTypeService: JobTypeService
  ) {
    super(formBuilder, utilityService);
    this.service = jobTypeService;
  }
}
