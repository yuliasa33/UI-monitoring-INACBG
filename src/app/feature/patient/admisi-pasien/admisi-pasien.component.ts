import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { LayoutComponent } from "../../../components/layout/layout.component";
import { ButtonNavModel } from 'src/app/components/models/buttonNavModel';
import { DynamicFormComponent } from "../../../components/dynamic-form/dynamic-form.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { LookupComponent } from "../../../components/organism/lookup/lookup.component";
import { InputLookupComponent } from "../../../components/organism/input-lookup/input-lookup.component";
import { InputLookUp } from 'src/app/components/models/inputLookupModel';
import { Store } from '@ngxs/store';
import { PatientState } from '../state/patient.state';
import { TableProps } from 'src/app/components/models/tableProps.model';
import { DataPoliState } from 'src/app/database/store/database-state/data-poli.state';
import { DataDokterState } from 'src/app/database/store/database-state/data-dokter.state';
import { MolInputFieldsComponent } from "../../../components/molecules/mol-input-fields/mol-input-fields.component";
import { GETALLDOKTERFORLOOKUPADMISI } from 'src/app/database/store/database-action/data-dokter.action';
import { Subject, takeUntil } from 'rxjs';
import { BoxCompsComponent } from "../../../components/box/box-comps/box-comps.component";
import * as LookupConfPassien from './json/lookupPasien.json'
import { PatientService } from '../service/patient.service';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import Swal from 'sweetalert2';
import * as LookupConfDokter from './json/lookupDokter.json'
import { Router } from '@angular/router';
import { IDebitur } from '../model/debitur.model';
import { GET_ALL_DEBITUR } from 'src/app/shared/api/patient/patient-api';
import { GetAllDebitur } from '../action/patient.action';


@Component({
  selector: 'app-admisi-pasien',
  standalone: true,
  imports: [CommonModule, LayoutComponent, DropdownModule, InputLookupComponent, MolInputFieldsComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './admisi-pasien.component.html',
  styleUrls: ['./admisi-pasien.component.scss'],
  providers:[Location]
})
export class AdmisiPasienComponent implements OnInit,OnDestroy {

  
  lookupConfPasien = LookupConfPassien

  lookupConfDokter = LookupConfDokter

  private destroy$ = new Subject<void>();

  ButtonNav:ButtonNavModel[] = [
    {icons:'pi pi-save',id:'save',styleClass:'p-button-sm',text:'Save'},
    {icons:'pi pi-arrow-left',id:'back',styleClass:'p-button-sm p-button-danger',text:'Back'}
  ]

  lookupDataSource:any[] = []

  @ViewChild('LookupPasien') LookupPasien!:InputLookupComponent
   tableLookupProps:TableProps.Table = {
     columns:[...this.lookupConfPasien.columns,
              {
                type:'button',
                header:'Action',
                button:[
                {buttonIcon:'pi pi-plus',
                  buttonLabel:'',
                  buttonClass:'p-button-sm p-button-rounded p-button-primary p-button-outlined',
                  onClick:(rowData:any)=>{
                    this.selectedRow = rowData
                    setTimeout(()=>{
                      this.LookupPasien.visible = false
                      this.LookupPasien.Value = this.selectedRow.full_name
                      this.FormAdmisiPasien.get('no_rekam_medis')?.setValue(this.selectedRow.no_rekam_medis)
                      this.FormAdmisiPasien.get('id_person')?.setValue(this.selectedRow.id_person)
                    },100)
                  }
                },
                ]
              }
     ],
     datasource:[],
     pagination:10,
     filteredBy:['full_name','no_rekam_medis']
   }

  selectedRowDebitur?: IDebitur
  @ViewChild('LookupDebitur') LookupDebitur!: InputLookupComponent
  tableLookupPropsDebitur: TableProps.Table = {
    columns: [
      { field: 'kode_debitur', header: 'Kode' },
      { field: 'nama_debitur', header: 'Nama Debitur' },
      {
        type:'button',
        header:'Action',
        button:[
        {buttonIcon:'pi pi-plus',
          buttonLabel:'',
          buttonClass:'p-button-sm p-button-rounded p-button-primary p-button-outlined',
          onClick:(rowData: any)=>{
            this.selectedRowDebitur = rowData
            setTimeout(()=>{
              this.LookupDebitur.visible = false
              this.LookupDebitur.Value = this.selectedRowDebitur?.nama_debitur
              this.FormAdmisiPasien.get('id_debitur')?.setValue(this.selectedRowDebitur?.id_debitur)
              this.store.dispatch(new GetAllDebitur())
              .pipe(takeUntil((this.destroy$)))
            },100)
          }
        }]
      }
    ],
    datasource:[],
    pagination: 10,
    filteredBy: ['nama_debitur']
  }

  selectedRowPoli:any
  @ViewChild('LookupPoli') LookupPoli!:InputLookupComponent
  tableLookupPropsPoli:TableProps.Table = {
    columns:[{field:'nama_poli',header:'Nama Poli'},
      {field:'kode_poli',header:'Kode Poli'} ,
          {
            type:'button',
            header:'Action',
            button:[
            {buttonIcon:'pi pi-plus',
              buttonLabel:'',
              buttonClass:'p-button-sm p-button-rounded p-button-primary p-button-outlined',
              onClick:(rowData: any)=>{
                // this.selectedRow.emit(rowData)
                console.log("Cek Pilih Row Data Poli ==> ", rowData)
                this.selectedRowPoli = rowData
                setTimeout(()=>{
                  this.LookupPoli.visible = false
                  console.log(this.selectedRowPoli)
                  this.LookupPoli.Value = this.selectedRowPoli.nama_poli
                  this.FormAdmisiPasien.get('id_poli')?.setValue(this.selectedRowPoli.id_poli)
                  this.store.dispatch(new GETALLDOKTERFORLOOKUPADMISI([],this.selectedRowPoli.id_poli))
                  .pipe(takeUntil((this.destroy$)))
                },100)
              }
            }]
          }
    ],
    datasource:[],
    pagination:10
  }


  selectedRow:any


  @ViewChild('LookupDokter') LookupDokter!:InputLookupComponent
  
  tableLookupPropsDokter:TableProps.Table = {
    columns:
    [
      ...this.lookupConfDokter.columns,
          {
            type:'button',
            header:'Action',
            button:[
            {buttonIcon:'pi pi-plus',
              buttonLabel:'',
              buttonClass:'p-button-sm p-button-rounded p-button-primary p-button-outlined',
              onClick:(rowData:any)=>{
                // this.selectedRow.emit(rowData)
                this.selectedRowDokter = rowData
                setTimeout(()=>{
                  this.LookupDokter.visible = false
                  console.log(this.selectedRowDokter)
                  this.LookupDokter.Value = this.selectedRowDokter.full_name
                  this.FormAdmisiPasien.get('id_dokter')?.setValue(this.selectedRowDokter.id_dokter)
                  this.FormAdmisiPasien.get('id_jadwal_dokter')?.setValue(this.selectedRowDokter.id_jadwal_dokter)
                },100)
              }
            }]
          }
    ],
    datasource:[],
    pagination:10
  }

  selectedRowDokter:any

  FormAdmisiPasien!:FormGroup

  constructor(private location:Location,
              private store:Store,
              private formBuilder:FormBuilder,
              private dataPasienService:PatientService,
              private utilityService:UtilityService,
              private router:Router
  ){
  }

  ngOnInit(): void {
    this.getDataLookup()
    this.setAttributeForm()
  }

  initState():void{
    
  }

  setAttributeForm():void{
    this.FormAdmisiPasien = this.formBuilder.group({
      id_poli:[0,[Validators.required]],
      id_dokter:[0,[Validators.required]],
      id_person:[0,[Validators.required]],
      id_jadwal_dokter:[0,[Validators.required]],
      id_debitur: [0, [Validators.required]],
      keluhan:[''],
      tgl_admisi:[new Date()],
      no_antrian:[""],
      no_rekam_medis: ['', [Validators.required]]
    })
  }


  getDataLookup():void{
     this.store.select(PatientState.SelGetPatients).subscribe(result=>{
        this.tableLookupProps.datasource = result.patient
        this.tableLookupPropsDebitur.datasource = result.debiturs
     })

    this.store.select(DataPoliState.selectPoliAll).subscribe(result=>{
      console.log("Cek Poli ==> ", result.poli.data)
      this.tableLookupPropsPoli.datasource = result.poli.data
    })

    this.store.select(DataDokterState.selectAddDokter).subscribe(result=>{
      this.tableLookupPropsDokter.datasource = result.dokter.data
    })   
  }

  handleClickButtonNav(ButtonId:any):void{
    switch(ButtonId){
      case 'save':
        this.handleSave()
      break;
      case 'back':
        break;
      default:
        break;
    }
  }

  handleSelectedRow(args:any):void{
    console.log(args)
  }

  handleSave():void{
    this.utilityService.onShowLoadingBeforeSend()
    const data = {
      ...this.FormAdmisiPasien.value,
      id_jadwal_dokter: 1, // Manual Validasi
      // no_rekam_medis: "MR-A000168", // Manual Validasi
      // id_debitur: 1, // Manual Validasi
    }
    this.dataPasienService.postAdmisiNonPenjamin(data)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result=>{
      if(result){
        Swal.close()
        if(result.responseResult != true){
          Swal.close()
        }else{
          Swal.close()
          this.utilityService.onSuccessToast(result.message)
          this.onResetForm()
          this.router.navigateByUrl('Patient/list-pasien-dalam-layanan')
        }
      }
    })
  }

  onResetForm():void{
    this.FormAdmisiPasien.reset()
    // window.location.reload()
  }

  handleDoubleClickSelect(args:any):void{
    console.log(args)
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
