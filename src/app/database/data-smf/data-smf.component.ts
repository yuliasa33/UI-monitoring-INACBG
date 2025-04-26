import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { TableProps } from 'src/app/components/models/tableProps.model';
import { BaseFormTableComponent } from 'src/app/shared/base-form-model.component';
import { JobTypeService } from '../services/data-job-type/job-type.service';
import { SmfDokterService } from '../services/data-smf-dokter/smf-dokter.service';
import { SmfModel } from 'src/app/shared/model/database.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { LayoutComponent } from 'src/app/components/layout/layout.component';
import { MolTableComponent } from 'src/app/components/molecules/mol-table/mol-table.component';

@Component({
  selector: 'app-data-smf',
  standalone: true,
  imports: [LayoutComponent, MolTableComponent, CommonModule, DialogModule, ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './data-smf.component.html',
  styleUrl: './data-smf.component.scss'
})
export class DataSmfComponent extends BaseFormTableComponent<SmfModel> implements OnInit {
  formFields = {
    id_smf: [0, []],
    kode_smf: ['', [Validators.required]],
    nama_smf: ['', [Validators.required]],
  };

  tableColumns: TableProps.FieldTable[] = [
    { field: 'kode_smf', header: 'Kode SMF' },
    { field: 'nama_smf', header: 'Nama SMF' },
  ];

  entityName = 'SMF Dokter';
  id = 'id_smf'
  service: SmfDokterService;

  constructor(
    formBuilder: FormBuilder,
    utilityService: UtilityService,
    smfService: SmfDokterService
  ) {
    super(formBuilder, utilityService);
    this.service = smfService;
  }
}
