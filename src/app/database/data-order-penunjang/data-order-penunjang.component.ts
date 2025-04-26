import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { LayoutComponent } from 'src/app/components/layout/layout.component';
import { MolTableComponent } from 'src/app/components/molecules/mol-table/mol-table.component';
import { BaseFormTableComponent } from 'src/app/shared/base-form-model.component';
import { GrupPenunjangModel } from 'src/app/shared/model/database.model';
import { OrderPenunjangService } from '../services/data-order-penunjang/data-order-penunjang.service';
import { TableProps } from 'src/app/components/models/tableProps.model';

@Component({
  selector: 'app-data-order-penunjang',
  standalone: true,
  imports: [LayoutComponent, MolTableComponent, CommonModule, DialogModule, ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './data-order-penunjang.component.html',
  styleUrl: './data-order-penunjang.component.scss'
})
export class DataOrderPenunjangComponent extends BaseFormTableComponent<GrupPenunjangModel> implements OnInit {
  formFields = {
    kode_grup_penunjang: ['', [Validators.required]],
    nama_grup_penunjang: ['', [Validators.required]],
  };

  tableColumns: TableProps.FieldTable[] = [
    { field: 'kode_grup_penunjang', header: 'Kode Grup Penunjang' },
    { field: 'nama_grup_penunjang', header: 'Nama Grup Penunjang' },
  ];

  entityName = 'Grup Order Tarif Penunjang';
  id = 'kode_grup_penunjang'
  service: OrderPenunjangService;

  constructor(
    formBuilder: FormBuilder,
    utilityService: UtilityService,
    orderPenunjangService: OrderPenunjangService
  ) {
    super(formBuilder, utilityService);
    this.service = orderPenunjangService;
  }
}
