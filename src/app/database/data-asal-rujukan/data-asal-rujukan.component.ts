import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { LayoutComponent } from 'src/app/components/layout/layout.component';
import { TableProps } from 'src/app/components/models/tableProps.model';
import { MolTableComponent } from 'src/app/components/molecules/mol-table/mol-table.component';
import { BaseFormTableComponent } from 'src/app/shared/base-form-model.component';
import { AsalRujukanModel } from 'src/app/shared/model/database.model';
import { AsalRujukanService } from '../services/data-asal-rujukan/asal-rujukan.service';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-data-asal-rujukan',
  standalone: true,
  imports: [LayoutComponent, MolTableComponent, CommonModule, DialogModule, ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule, RadioButtonModule],
  templateUrl: './data-asal-rujukan.component.html',
  styleUrl: './data-asal-rujukan.component.scss'
})
export class DataAsalRujukanComponent extends BaseFormTableComponent<AsalRujukanModel> implements OnInit {
  formFields = {
    id_asal_rujukan: [0, []],
    kode_asal_rujukan: ['', [Validators.required]],
    nama_asal_rujukan: ['', [Validators.required]],
    is_required_kode_wilayah: [false, []],
  };

  tableColumns: TableProps.FieldTable[] = [
    { field: 'kode_asal_rujukan', header: 'Kode' },
    { field: 'nama_asal_rujukan', header: 'Asal Rujukan' },
  ];

  entityName = 'Asal Rujukan';
  id = 'id_asal_rujukan'
  service: AsalRujukanService;

  constructor(
    formBuilder: FormBuilder,
    utilityService: UtilityService,
    asalRujukanService: AsalRujukanService
  ) {
    super(formBuilder, utilityService);
    this.service = asalRujukanService;
  }
}
