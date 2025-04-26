import { Component, OnInit } from '@angular/core';
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
import { AddKewarganegaraan, DeleteKewarganegaraan, GetKewarganegaraan, UpdateKewarganegaraan } from '../store/database-action/data-kewarganegaraan.action';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
@Component({
  selector: 'app-data-warganegara',
  standalone: true,
  imports: [CommonModule, LayoutComponent, MolTableComponent, ButtonModule, DialogModule, FormsModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './data-warganegara.component.html',
  styleUrls: ['./data-warganegara.component.scss']
})
export class DataWarganegaraComponent implements OnInit {

  visible: any = false

  inputState: 'normal' | 'edit' = 'normal'

  TableProps: TableProps.Table = {
    columns: [{
      field: 'kode_kebangsaan', header: 'KODE KEBANGSAAN',
    },
    {
      field: 'nama_kebangsaan', header: 'NAMA KEBANGSAAN',
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
    // }],
  ],
    datasource: [],
    pagination: 10,
    filteredBy: ["nama_kebangsaan", "kode_kebangsaan"],
    toolbars:['Add','Edit','Delete']
  }

  ButtonNav: ButtonNavModel[] = [
    // { icons: 'pi pi-plus', id: 'Add', styleClass: 'p-button-success', text: 'Add' }
  ]

  FormInputNegara!: FormGroup

  selectedNations:any

  constructor(private store: Store,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService
  ) {

  }

  ngOnInit(): void {
    this.store.select(KewarganegaraanState.selectAllWargaNegaraGet).subscribe(result => {
      this.TableProps.datasource = result.WN
    })
    this.setAttributeForm()
  }

  setAttributeForm(): void {
    this.FormInputNegara = this.formBuilder.group({
      nama_kebangsaan: [""],
      kode_kebangsaan: [""],
      id_kebangsaan: [0]
    })
  }

  handleClickButtonNav(ButtonId: any): void {
    if (ButtonId == 'Add') {
      this.visible = true
    }
  }

  handleSelectedRow(args:any):void{
      this.selectedNations = args.data
  }

  handleToolbarClick(args:any):void{
    if(args == 'Add'){
      this.visible = true
    }

    if(args == 'Edit'){
      if(!this.selectedNations) return this.utilityService.onInfoToast("Silahkan pilih item terlebih dahulu.")
      this.inputState = "edit"
      this.handleEditData(this.selectedNations)
    }

    if(args == 'Delete'){
      if(!this.selectedNations) return this.utilityService.onInfoToast("Silahkan pilih item terlebih dahulu.")
      this.handleDelete(this.selectedNations)
    }

  }

  handleEditData(args: any): void {
    this.visible = true
    this.setForm(args)
  }

  handleDelete(args: any): void {
    this.utilityService.onShowingConfirmationAlert(
      "warning",
      "Peringatan",
      `Apa anda yakin ingin menghapus ${args.nama_kebangsaan} ?`,
      () => {
        this.store.dispatch(new DeleteKewarganegaraan(args.id_kebangsaan))
        .subscribe(result=>{
          this.store.dispatch(new GetKewarganegaraan())
        })
      },
      () => {}
    )
  }
  setForm(data: any): void {
    this.FormInputNegara.setValue(data)
  }

  resetForm(): void {
    this.FormInputNegara.reset()
  }

  handleCloseDialog() {
    return this.visible = false
  }

  handleClickSubmit(Form: any): void {
    if(this.inputState === "normal"){
      this.store.dispatch(new AddKewarganegaraan(Form)).subscribe(result => {
        console.log(result)
        this.handleCloseDialog()
        this.store.dispatch(new GetKewarganegaraan())
        this.resetForm()
      })
    } else {
      this.store.dispatch(new UpdateKewarganegaraan(Form)).subscribe(result => {
        console.log(result)
        this.handleCloseDialog()
        this.store.dispatch(new GetKewarganegaraan())
        this.resetForm()
      })
    }
  }

  handleClickCancelInput(): void {
    this.resetForm()
    this.visible = false
  }

}
