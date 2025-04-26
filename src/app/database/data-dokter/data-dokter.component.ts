import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from "../../components/layout/layout.component";
import { MolTableComponent } from "../../components/molecules/mol-table/mol-table.component";
import { TableProps } from 'src/app/components/models/tableProps.model';
import { Store } from '@ngxs/store';
import { KewarganegaraanState } from '../store/database-state/data-kewarganegaraan.state';
import { ButtonNavModel } from 'src/app/components/models/buttonNavModel';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DataDokterState } from '../store/database-state/data-dokter.state';
@Component({
  selector: 'app-data-dokter',
  standalone: true,
  imports: [CommonModule,LayoutComponent,MolTableComponent,DialogModule,InputTextModule,ReactiveFormsModule,DropdownModule,CalendarModule,FormsModule],
  templateUrl: './data-dokter.component.html',
  styleUrls: ['./data-dokter.component.scss']
})
export class DataDokterComponent {
  visible: any = false

  inputState: 'normal' | 'edit' = 'normal'

  TableProps: TableProps.Table = {
    columns: [
      {
        field: 'no_identitas',
        header: 'No.Identitas'
      },
      {
        field: 'kode_dokter', 
        header: 'KODE DOKTER'
      },
      {
        field: 'full_name', 
        header: 'NAMA DOKTER'
      },
      {
        field: 'spesialisasi_dokter',
        header: 'Spesialis'
      },
      {
        field: 'gender',
        header: 'Gender'
      },
      {
        field: 'alamat_lengkap',
        header: 'Alamat'
      },
      {
        field: 'is_active',
        header: 'Active',
      },
      // {
      //   type: 'button',
      //   header: 'Action',
      //   button: [
      //     {
      //       buttonIcon: 'pi pi-pencil',
      //       buttonLabel: '',
      //       buttonClass: 'p-button-sm p-button-warning p-button-outlined',
      //       onClick: (Rowdata: any) => { this.handleEditData(Rowdata) }
      //     },
      //     {
      //       buttonIcon: 'pi pi-trash',
      //       buttonLabel: '',
      //       buttonClass: 'p-button-sm p-button-danger p-button-outlined',
      //       onClick:(Rowdata:any)=>{
      //         this.handleDelete(Rowdata)
      //       }
      //     }
      //   ]
      // }
    ],
    datasource: [],
    pagination: 10,
    filteredBy:['full_name','kode_dokter']
  }

  ButtonNav: ButtonNavModel[] = [
    { icons: 'pi pi-plus', id: 'Add', styleClass: 'p-button-success p-button-sm', text: 'Add' }
  ]

  FormInputDokter!: FormGroup

  constructor(private store: Store,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.store.select(DataDokterState.selectAddDokter).subscribe(result => {
      this.TableProps.datasource = result.dokter.data
    })
    this.setAttributeForm()
  }

  setAttributeForm(): void {
    this.FormInputDokter = this.formBuilder.group({
      nama_dokter: [""],
      kode_dokter: [""],
      id_kebangsaan: [0]
    })
  }

  handleClickButtonNav(ButtonId: any): void {
    if (ButtonId == 'Add') {
      this.visible = true
    }
  }

  handleEditData(args: any): void {
    this.inputState = "edit"
    this.visible = true
    this.setForm(args)
  }

  handleDelete(args: any): void {
    // this.store.dispatch(new DeleteKewarganegaraan(args.id_kebangsaan))
    // .subscribe(result=>{
    //   this.store.dispatch(new GetKewarganegaraan())
    // })
  }
  setForm(data: any): void {
    console.log(data)
    this.FormInputDokter.setValue(data)
  }

  resetForm(): void {
    this.FormInputDokter.reset()
  }

  handleCloseDialog() {
    return this.visible = false
  }

  handleClickSubmit(Form: any): void {
    // this.store.dispatch(new AddKewarganegaraan(Form)).subscribe(result => {
    //   console.log(result)
    //   this.handleCloseDialog()
    //   this.store.dispatch(new GetKewarganegaraan())
    //   this.resetForm()
    // })
  }

  handleClickCancelInput(): void {

  }
}
