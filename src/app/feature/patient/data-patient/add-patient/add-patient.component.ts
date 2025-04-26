import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { LayoutComponent } from "../../../../components/layout/layout.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonNavModel } from 'src/app/components/models/buttonNavModel';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { Store } from '@ngxs/store';
import { KewarganegaraanState } from 'src/app/database/store/database-state/data-kewarganegaraan.state';
import { DropdownAttributeModel, MolDropdownComponent } from "../../../../components/molecules/mol-dropdown/mol-dropdown.component";
import { PatientService } from '../../service/patient.service';
import { Router } from '@angular/router';
import { IAgama, InsertPersonRequest } from '../../model/person.model';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { CheckboxModule } from 'primeng/checkbox';
import { GetPatient } from '../../action/patient.action';
import Swal from 'sweetalert2';
import { TableProps } from 'src/app/components/models/tableProps.model';

type DropdownItemType = { label: string, value: string }[]
@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [CommonModule, InputTextModule, CalendarModule, DropdownModule, LayoutComponent, FormsModule, ReactiveFormsModule, MolDropdownComponent, CheckboxModule],
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})


export class AddPatientComponent implements OnInit{

  FormInputPasien!: FormGroup

  Gender: any[] = [
    {text:'Laki - Laki',value:'L'},
    {text:'Perempuan',value:'P'}
  ];

  Nationality: DropdownItemType = []
  Agama: DropdownItemType = []
  JobType: DropdownItemType = []
    
  ButtonNav:ButtonNavModel[] = [
    {icons:'pi pi-save',id:'add',text:'Tambah Pasien',styleClass:'p-button-primary p-button-sm'},
    {icons:'pi pi-arrow-left',id:'back',text:'Back',styleClass:'p-button-danger p-button-sm'}
  ]

 

    constructor(
      private formBuilder: FormBuilder,
      private store: Store,
      private router: Router,
      private location: Location,
      private patientService: PatientService,
      private utilityService: UtilityService
    ){}

    ngOnInit(): void {
      this.setAttributeForm()
      this.getNationality()
      this.patientService.getAllAgama()
      .subscribe(result => {
        this.Agama = result.data.map(item => ({ label: item.agama, value: item.id_agama }))
      })
      this.patientService.getAllJobType()
      .subscribe(result => {
        this.JobType = result.data.map(item => ({ label: item.job_type, value: item.id_job_type }))
      })
    }

    handleClickButtonNav(ButtonId:any):void{
      switch(ButtonId){
        case 'add':
          const data:InsertPersonRequest = this.FormInputPasien.value
          this.patientService.insertPersonLogic(data)
          .then((response)=>{
            console.log(response)
          })
          // console.log("Cek Data Save => ", data)
          // this.patientService.insertPerson({
          //   tanggal_lahir: (data.tanggal_lahir as Date).toUTCString(),
          //   id_kebangsaan: data.kebangsaan.value,
          //   id_job_type: data.job_type.value,
          //   id_agama: data.agama.value,
          //   no_identitas: data.no_identitas,
          //   no_kartu_keluarga: data.no_kartu_keluarga,
          //   id_member: 0,
          //   is_member: false,
          //   nama_lengkap: data.nama_lengkap,
          //   phone: data.phone,
          //   alamat: data.alamat,
          //   email: data.email,
          //   gender: data.gender.value,
          //   kota: data.kota,
          //   panggilan: data.panggilan,
          //   tempat_lahir: data.tempat_lahir
          // })
          // .subscribe(res => {
          //   if(!res.responseResult){
          //     Swal.close()
          //     this.utilityService.onFailedToast(res.message)
          //   }
          //   this.utilityService.onSuccessToast("Data berhasil ditambahkan")
          //     this.store.dispatch(new GetPatient())
          //     this.location.back()
          // })
          break
        case 'back':
        this.location.back()
        break;
        default:
          break;
      }
    }

    setAttributeForm():void{
      this.FormInputPasien = this.formBuilder.group({
        nik:[],
        no_identitas:[],
        no_kartu_keluarga: [],
        nama_lengkap:[],
        phone: [],
        alamat:[],
        email:[],
        gender:[],
        kota: [],
        tanggal_lahir:[],
        tempat_lahir:[],
        panggilan:[],

        kebangsaan:[1],
        agama: [],
        job_type: []
      })
    }

    getNationality():void{
        this.store.select(KewarganegaraanState.selectAllWargaNegaraGet).subscribe(result=>{
           this.Nationality = result.WN?.map((el:any)=>({
            label:el.nama_kebangsaan, 
            value:el.id_kebangsaan
          }))
           console.log(this.Nationality)
        })
      }


}
