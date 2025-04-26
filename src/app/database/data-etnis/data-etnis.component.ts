import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { TableProps } from 'src/app/components/models/tableProps.model';
import { BaseFormTableComponent } from 'src/app/shared/base-form-model.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { LayoutComponent } from 'src/app/components/layout/layout.component';
import { MolTableComponent } from 'src/app/components/molecules/mol-table/mol-table.component';
import { EtnisService } from '../services/data-etnis/etnis.service';
import { EtnisModel } from 'src/app/shared/model/database.model';

@Component({
  selector: 'app-data-etnis',
  standalone: true,
  imports: [LayoutComponent, MolTableComponent, CommonModule, DialogModule, ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './data-etnis.component.html',
  styleUrl: './data-etnis.component.scss'
})
export class DataEtnisComponent extends BaseFormTableComponent<EtnisModel> implements OnInit {
  formFields = {
    id_etnis: [0, []],
    etnis: ['', [Validators.required]],
  };

  tableColumns: TableProps.FieldTable[] = [
    { field: 'etnis', header: 'Etnis' },
  ];

  entityName = 'Etnis';
  id = 'id_etnis'
  service: EtnisService;

  constructor(
    formBuilder: FormBuilder,
    utilityService: UtilityService,
    etnisService: EtnisService
  ) {
    super(formBuilder, utilityService);
    this.service = etnisService;
  }
}
