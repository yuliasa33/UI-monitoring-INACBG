import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { LayoutComponent } from "../../../components/layout/layout.component";
import { CommonModule } from '@angular/common';
import { TableProps } from 'src/app/components/models/tableProps.model';
import { MolTableComponent } from "../../../components/molecules/mol-table/mol-table.component";
import { SetupCutiDokterService } from '../../services/setup-cuti-dokter/setup-cuti-dokter.service';
import { CutiDokterModel } from 'src/app/shared/model/setup-cuti-dokter';
import { DialogModule } from 'primeng/dialog';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputLookupComponent } from "../../../components/organism/input-lookup/input-lookup.component";
import { SetupDokterService } from '../../services/setup-dokter/setup-dokter.service';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DokterModel } from 'src/app/shared/model/setup-jadwal-dokter.model';

@Component({
  selector: 'app-cuti-dokter',
  standalone: true,
  imports: [CommonModule, LayoutComponent, MolTableComponent, DialogModule, ReactiveFormsModule, FormsModule, ButtonModule, InputTextModule, InputLookupComponent, CalendarModule, InputTextareaModule],
  templateUrl: './cuti-dokter.component.html',
  styleUrl: './cuti-dokter.component.scss'
})
export class CutiDokterComponent implements OnInit {
  inputState: 'Add' | 'Edit' | 'Detail' = 'Add'
  showModal = signal<boolean>(false)
  selectedRow = signal<CutiDokterModel | undefined>(undefined)
  FormItem!: FormGroup
  selectedRowDokter?: DokterModel

  constructor(
    private cutiDokterService: SetupCutiDokterService,
    private dokterService: SetupDokterService,
    private utilityService: UtilityService,
    private formBuilder: FormBuilder
  ){
    this.FormItem = this.formBuilder.group({
      id_dokter: [0, [Validators.required]],
      tgl_mulai_cuti: ['', [Validators.required]],
      tgl_selesai_cuti: ['', [Validators.required]],
      keterangan: ['', []],
    });
  }

  TableProps: TableProps.Table = {
    columns: [
      {
        field: 'nama_dokter', 
        header: 'NAMA DOKTER'
      },
      {
        field: 'spesialisasi_dokter',
        header: 'Spesialis'
      },
      {
        field: 'tgl_mulai_cuti',
        header: 'Tgl Mulai Cuti',
        type: 'date'
      },
      {
        field: 'tgl_selesai_cuti',
        header: 'Tgl Selesai Cuti',
        type: 'date'
      },
      {
        field: 'keterangan',
        header: 'Keterangan'
      },
      {
        field: 'is_active',
        header: 'Status',
        type: 'toggle',
        toggleProps: {
          valueChange: (checked: boolean, data: CutiDokterModel) => {
            this.cutiDokterService.onPutEditStatus({ id_dokter: data.id_dokter, is_active: !checked })
            .subscribe()
          }
        }
      }
    ],
    datasource: [],
    pagination: 10,
    filteredBy:['nama_dokter'],
    toolbars: ['Add', 'Edit', 'Print']
  }

  @ViewChild('LookupDokter') LookupDokter!:InputLookupComponent
  tableLookupProps: TableProps.Table = {
    columns: [
      {
        field: 'kode_dokter',
        header: 'Kode Dokter'
      },
      {
        field: 'full_name',
        header: 'Nama Dokter'
      },
      {
        field: 'spesialisasi_dokter',
        header: 'Spesialis'
      },
      {
        type:'button',
        header:'Action',
        button:[
          {
            buttonIcon:'pi pi-plus',
            buttonLabel:'',
            buttonClass:'p-button-sm p-button-rounded p-button-primary p-button-outlined',
            onClick: (rowData:any) => {
              this.selectedRowDokter = rowData
              setTimeout(()=>{
                this.LookupDokter.visible = false
                this.LookupDokter.Value = this.selectedRowDokter?.full_name
                this.FormItem.patchValue({
                  id_dokter: this.selectedRowDokter?.id_dokter,
                })
              },100)
            }
          }
        ]
      }
    ],
    datasource: [],
    pagination: 10,
    filteredBy:['kode_dokter', 'full_name', 'spesialisasi_dokter'],
  }

  ngOnInit(): void {
    this.cutiDokterService.onGetAll()
    .subscribe(res => this.TableProps.datasource = res.data)
    this.dokterService.onGetAllDokter()
    .subscribe(res => this.tableLookupProps.datasource = res.data)
  }

  handleToolbarClick(args:any):void{
    if(args == 'Add'){
      this.showModal.set(true)
    } else if(args == 'Edit'){
      if(!this.selectedRow()) return this.utilityService.onInfoToast("Silahkan pilih item terlebih dahulu")
      this.LookupDokter.Value = this.selectedRow()?.nama_dokter
      this.FormItem.setValue({
        id_dokter: this.selectedRow()?.id_dokter,
        tgl_mulai_cuti: new Date(this.selectedRow()?.tgl_mulai_cuti as string),
        tgl_selesai_cuti: new Date(this.selectedRow()?.tgl_selesai_cuti as string),
        keterangan: this.selectedRow()?.keterangan
      })
      this.inputState = "Edit"
      this.showModal.set(true)
    }
  }

  handleSelectRow(args: any): void {
    this.selectedRow.set(args.data)
  }

  handleShowModal(args: boolean): void {
    this.showModal.set(args)
    if(!args) {
      this.FormItem.reset()
      this.selectedRow.set(undefined)
      this.inputState = 'Add'
    }
  }

  handleSubmit(): void {
    if(this.FormItem.invalid) return this.utilityService.onInfoToast("Silahkan isi semua data yang dibutuhkan")
    if(this.inputState == 'Add'){
      this.cutiDokterService.onPostSave(this.FormItem.value)
      .subscribe(res => {
        this.utilityService.onSuccessToast(res.message)
        this.handleShowModal(false)
        this.cutiDokterService.onGetAll()
        .subscribe(res => this.TableProps.datasource = res.data)
      })
    } else if(this.inputState == 'Edit'){
      this.cutiDokterService.onPutEdit(this.FormItem.value)
      .subscribe(res => {
        this.utilityService.onSuccessToast(res.message)
        this.handleShowModal(false)
        this.cutiDokterService.onGetAll()
        .subscribe(res => this.TableProps.datasource = res.data)
      })
    }
  }

  handleCancel(): void {
    this.FormItem.reset()
    this.LookupDokter.Value = null
    this.selectedRowDokter = undefined
    this.selectedRow.set(undefined)
    this.inputState = 'Add'
    this.handleShowModal(false)
  }
}
