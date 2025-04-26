import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { LayoutComponent } from 'src/app/components/layout/layout.component';
import { TableProps } from 'src/app/components/models/tableProps.model';
import { MolTableComponent } from 'src/app/components/molecules/mol-table/mol-table.component';
import { BaseFormTableComponent } from 'src/app/shared/base-form-model.component';
import { SpesialisasiDokterModel } from 'src/app/shared/model/database.model';
import { JobTypeService } from '../services/data-job-type/job-type.service';
import { SpesialisasiDokterService } from '../services/data-spesialisasi-dokter/spesialisasi-dokter.service';

@Component({
  selector: 'app-data-spesialisasi-dokter',
  standalone: true,
  imports: [LayoutComponent, MolTableComponent, CommonModule, DialogModule, ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './data-spesialisasi-dokter.component.html',
  styleUrl: './data-spesialisasi-dokter.component.scss'
})
export class DataSpesialisasiDokterComponent extends BaseFormTableComponent<SpesialisasiDokterModel> implements OnInit {
  formFields = {
    id_spesialisasi_dokter: [0, []],
    kode_spesialisasi_dokter: ['', [Validators.required]],
    spesialisasi_dokter: ['', [Validators.required]],
  };

  tableColumns: TableProps.FieldTable[] = [
    { field: 'kode_spesialisasi_dokter', header: 'Kode' },
    { field: 'spesialisasi_dokter', header: 'Spesialisasi Dokter' },
  ];

  entityName = 'Spesialisasi Dokter';
  id = 'id_spesialisasi_dokter'
  service: SpesialisasiDokterService;

  constructor(
    formBuilder: FormBuilder,
    utilityService: UtilityService,
    spesialisasiDokterService: SpesialisasiDokterService
  ) {
    super(formBuilder, utilityService);
    this.service = spesialisasiDokterService;
  }
}
