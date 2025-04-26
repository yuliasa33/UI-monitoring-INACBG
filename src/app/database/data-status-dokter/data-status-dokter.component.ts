import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { LayoutComponent } from 'src/app/components/layout/layout.component';
import { MolTableComponent } from 'src/app/components/molecules/mol-table/mol-table.component';
import { BaseFormTableComponent } from 'src/app/shared/base-form-model.component';
import { StatusDokterModel } from 'src/app/shared/model/database.model';
import { StatusDokterService } from '../services/data-status-dokter/staus-dokter.service';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { TableProps } from 'src/app/components/models/tableProps.model';

@Component({
  selector: 'app-data-status-dokter',
  standalone: true,
  imports: [LayoutComponent, MolTableComponent, CommonModule, DialogModule, ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './data-status-dokter.component.html',
  styleUrl: './data-status-dokter.component.scss'
})
export class DataStatusDokterComponent extends BaseFormTableComponent<StatusDokterModel> implements OnInit {
  formFields = {
    id_status_dokter: [0, []],
    status_dokter: ['', [Validators.required]],
  };

  tableColumns: TableProps.FieldTable[] = [
    { field: 'status_dokter', header: 'Status Dokter' },
  ];

  entityName = 'Status Dokter';
  id = 'id_status_dokter'
  service: StatusDokterService;

  constructor(
    formBuilder: FormBuilder,
    utilityService: UtilityService,
    statusDokterService: StatusDokterService
  ) {
    super(formBuilder, utilityService);
    this.service = statusDokterService;
  }
}
