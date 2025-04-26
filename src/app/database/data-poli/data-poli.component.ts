import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from "../../components/layout/layout.component";
import { TableProps } from 'src/app/components/models/tableProps.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { DataPoliState } from '../store/database-state/data-poli.state';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MolTableComponent } from 'src/app/components/molecules/mol-table/mol-table.component';
import { AddPOLI, DeletePoli, EditPoli, GETALLPOLI } from '../store/database-action/data-poli.action';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
@Component({
  selector: 'app-data-poli',
  standalone: true,
  imports: [CommonModule, LayoutComponent,ReactiveFormsModule,FormsModule,DialogModule,InputTextModule,DropdownModule,CalendarModule,MolTableComponent],
  templateUrl: './data-poli.component.html',
  styleUrls: ['./data-poli.component.scss']
})
export class DataPoliComponent {
  visible: any = false
  selectedPoli: any
  inputState: 'add' | 'edit' = 'add'

  TableProps: TableProps.Table = {
    columns: [
      {
        field: 'kode_poli', header: 'KODE POLI'
      },
      {
        field: 'nama_poli', header: 'NAMA POLI',
      }
    ],
    datasource: [],
    pagination: 10,
    toolbars:['Add','Edit','Delete','Print'],
    filteredBy: ["kode_poli"]
  }

  FormInputPoli!: FormGroup

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService
  ) {

  }

  ngOnInit(): void {
    this.store.select(DataPoliState.selectPoliAll).subscribe(result => {
      this.TableProps.datasource = result.poli.data
    })
    this.setAttributeForm()
  }

  setAttributeForm(): void {
    this.FormInputPoli = this.formBuilder.group({
      id_poli: [""],
      nama_poli: [""],
      kode_poli: [""],
      id_jenis_ruangan: [1]
    })
  }

  handleSelectedRow(args:any):void {
    this.selectedPoli = args.data
  }

  handleAddData(): void {
    this.visible = true
    this.inputState = 'add'
    this.FormInputPoli.get('id_jenis_ruangan')?.setValue(1)
  }

  handleEditData(args: any): void {
    if(!this.selectedPoli) {
      this.utilityService.onInfoToast("Silahkan pilih item terlebih dahulu.")
    } else {
      this.visible = true
      this.inputState = 'edit'
      this.setForm(args)
    }
  }

  handleDelete(args: any): void {
    if(!this.selectedPoli) return
    this.utilityService.onShowingConfirmationAlert(
      'warning', 
      'Peringatan',
      `Apa anda yakin ingin menghapus data '${this.selectedPoli.nama_poli}' ?`,
      () => {
        this.store.dispatch(new DeletePoli(this.selectedPoli.id_poli))
        .subscribe(res => {
          this.store.dispatch(new GETALLPOLI())
          this.utilityService.onSuccessToast("Data Poli berhasil dihapus!!!")
          this.selectedPoli = undefined
        })
      },
      () => {}
    )
  }

  setForm(data: any): void {
    this.FormInputPoli.get('id_poli')?.setValue(data.id_poli)
    this.FormInputPoli.get('kode_poli')?.setValue(data.kode_poli) 
    this.FormInputPoli.get('nama_poli')?.setValue(data.nama_poli)
    this.FormInputPoli.get('id_jenis_ruangan')?.setValue(1)
  }

  resetForm(): void {
    this.FormInputPoli.reset()
  }

  handleCloseDialog() {
    return this.visible = false
  }

  handleClickSubmit(Form: any): void {
    if(this.inputState == "add") {
      this.store.dispatch(new AddPOLI(Form)).subscribe(result => {
        this.handleCloseDialog()
        this.utilityService.onSuccessToast("Data Poli berhasil ditambahkan!!!")
        this.store.dispatch(new GETALLPOLI())
        this.resetForm()
      })
    } else {
      this.store.dispatch(new EditPoli(Form)).subscribe(result => {
        this.handleCloseDialog()
        this.utilityService.onSuccessToast("Data Poli berhasil diubah!!!")
        this.store.dispatch(new GETALLPOLI())
        this.selectedPoli = undefined
        this.resetForm()
      })
    }
  }

  handleClickCancelInput(): void {
    this.visible = false
    if(this.FormInputPoli.dirty){
      this.utilityService.onShowingConfirmationAlert(
        'info', 
        'Perhatian', 
        'Data Inputan akan hilang jika anda batalkan ', 
        () => {
          this.visible = false
          this.resetForm()
        },
        () => {
          this.visible = true
        })
    } else {
      this.resetForm()
    }
  }

  handleToolbarClicK(args:any):void{
    const toolbar = args.toLowerCase()
    switch(toolbar){
      case'add':
        this.handleAddData()
        break;
      case'edit':
        this, this.handleEditData(this.selectedPoli)
        break;
      case'delete':
        this.handleDelete(this.selectedPoli.id_poli)
        break;
      case'print':
        break;
      default:
        break;
    }
  }
}
