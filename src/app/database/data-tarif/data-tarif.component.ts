import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from "../../components/layout/layout.component";
import { MolTableComponent } from "../../components/molecules/mol-table/mol-table.component";
import { TableProps } from 'src/app/components/models/tableProps.model';
import { SetupTarifService } from '../services/setup-tarif/setup-tarif.service';
import { Store } from '@ngxs/store';
import { DataTarifState } from '../store/database-state/data-tarif.state';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { Subject } from 'rxjs';
import tableConfig  from './json/table.config.json';

@Component({
  selector: 'app-data-tarif',
  standalone: true,
  imports: [CommonModule, LayoutComponent, MolTableComponent,DialogModule,ButtonModule,FormsModule,ReactiveFormsModule,InputTextModule],
  templateUrl: './data-tarif.component.html',
  styleUrls: ['./data-tarif.component.scss'],
})
export class DataTarifComponent implements OnInit,OnDestroy {

  TableConf = tableConfig 

  $Destroy = new Subject() 

  inputState:'input'|'edit' = 'input'

  FormTarif!:FormGroup

  visible:boolean = false

  selectedTarif:any

  TableProps: TableProps.Table = {
    columns: [
     ...this.TableConf.columns,
      // {
      //   type: 'button',
      //   header: 'Action',
      //   button: [
      //     {
      //       buttonIcon: 'pi pi-pencil',
      //       buttonLabel: '',
      //       buttonClass: 'p-button-sm p-button-warning  p-button-outlined',
      //       onClick: (Rowdata: any) => { this.handleEditData(Rowdata) }
      //     },
      //     {
      //       buttonIcon: 'pi pi-trash',
      //       buttonLabel: '',
      //       buttonClass: 'p-button-sm p-button-danger p-button-outlined',
      //       onClick: (Rowdata: any) => {
      //         this.handleDelete(Rowdata)
      //       }
      //     }
      //   ]
      // }
    ],
    datasource: [],
    pagination: 10,
    toolbars:['Add','Edit','Delete','Print']
  }

  constructor(
    private store: Store,
    public setupTarifService:SetupTarifService,
    private formBuilder:FormBuilder,
    private utilityService:UtilityService
  ) {}

  ngOnInit(): void {
    this.GetData()
    this.setAttributeForm()
  }

  setAttributeForm():void{
    this.FormTarif = this.formBuilder.group({
      kode_tarif:[""],
      nama_tarif:[""],
      harga:[0]
    })
  }

  GetData(): void {
    this.store.select(DataTarifState.selectAllTarif).subscribe(result => {
      this.TableProps.datasource = result.tarif.data
    })

  }

  handleSelectedRow(args:any):void {
    this.selectedTarif = args.data
  }

  handleAddData(): void {
    this.inputState = 'input'
    this.visible = true
  }

  handleEditData(args: any): void {
    console.log(args)
    this.inputState = 'edit'
    this.selectedTarif = args
    this.visible = true
    this.setForm(this.selectedTarif)
  }

  setForm(Data:any): void {
    this.FormTarif.get('kode_tarif')?.setValue(Data.kode_setup_tarif) 
    this.FormTarif.get('nama_tarif')?.setValue(Data.nama_setup_tarif) 
    this.FormTarif.get('harga')?.setValue(Data.nominal_tarif) 
  }

  handleDelete(args: any): void {
    if(!this.selectedTarif) return
    this.utilityService.onShowingConfirmationAlert(
      'warning', 
      'Peringatan',
      `Apa anda yakin ingin menghapus data '${this.selectedTarif.nama_setup_tarif}' ?`,
      () => {
        console.log("Data Hapus")
      },
      () => {}
    )
  }

  handleClickCancelInput(): void {
    this.visible = false
    if(this.FormTarif.dirty){
      this.utilityService.onShowingConfirmationAlert('info', 'Perhatian', 'Data Inputan akan hilang jika anda batalkan ', () => {
        this.visible = false
  
        this.ResetForm()
      },
        () => {
          this.visible = true
        })
    } else {
      this.ResetForm()
    }
  }

  ResetForm():void{
    this.FormTarif.reset()
  }

  ngOnDestroy(): void {
    this.$Destroy.next(null)
    this.$Destroy.complete()
  }

  handleClickSubmit(FormsValue: any): void { 
    if(this.inputState === 'input'){
      this.setupTarifService.insert(FormsValue)
      .subscribe((data: any) => {
        this.visible = false
        this.GetData()
        this.ResetForm()
      })
    } else {
      this.setupTarifService.update(FormsValue)
      .subscribe((data: any) => {
        this.visible = false
        this.GetData()
        this.ResetForm()
      })
    }
  }

  handleToolbarClicK(args:any):void{
    const toolbar = args.toLowerCase()
    console.log("Cek Toolbar", toolbar)
    switch(toolbar){
      case'add':
        this.handleAddData()
        break;
      case'edit':
        this, this.handleEditData(this.selectedTarif)
        break;
      case'delete':
        this.handleDelete(this.selectedTarif.id_poli)
        break;
      case'print':
        break;
      default:
        break;
    }
  }

}
