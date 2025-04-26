import { CommonModule, formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutComponent } from "../../../components/layout/layout.component";
import { MolTableComponent } from "../../../components/molecules/mol-table/mol-table.component";
import { TableProps } from 'src/app/components/models/tableProps.model';
import { PatientService } from '../service/patient.service';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import Swal from 'sweetalert2';
import { ButtonNavModel } from 'src/app/components/models/buttonNavModel';
import { Store } from '@ngxs/store';
import { PatientState } from '../state/patient.state';
import { map, Subject, takeUntil } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { KewarganegaraanState } from 'src/app/database/store/database-state/data-kewarganegaraan.state';
import { Router } from '@angular/router';
import { InsertPersonRequest, UpdatePerson } from '../model/person.model';
import { SidebarModule } from 'primeng/sidebar';
import { GetPatient } from '../action/patient.action';

type DropdownItemType = { label: string, value: string | number }[]

@Component({
  standalone: true,
  imports: [CommonModule, LayoutComponent, ButtonModule, MolTableComponent, DialogModule, InputTextModule, DropdownModule, FormsModule, ReactiveFormsModule, CalendarModule, SidebarModule],
  selector: 'app-data-patient',
  templateUrl: './data-patient.component.html',
  styleUrls: ['./data-patient.component.scss']
})
export class DataPatientComponent implements OnInit, OnDestroy {
  sidebarVisible4: boolean = false;
  sidebarVisible5: boolean = false;
  $Destroy = new Subject()

  visible: boolean = false

  FormInputPasien!: FormGroup

  Gender: { text: string, value: string }[] = [
    { text: 'Laki - Laki', value: 'L' },
    { text: 'Perempuan', value: 'P' }
  ];

  Nationality: Array<{ label: string, value: number }> = []

  NationalitySelect: any = {}
  Agama: DropdownItemType = []
  JobType: DropdownItemType = []

  selectedGender: any;

  ButtonNav: ButtonNavModel[] = [
    // { icons: 'pi pi-plus', id: 'add', text: 'Tambah Pasien', styleClass: 'p-button-success' }
  ]

  religion: any

  selectedTanggalLahir: any

  tableProps: TableProps.Table = {
    columns: [{
      field: 'no_identitas', header: 'NIK'
    },
    {
      field: 'full_name', header: 'NAMA'
    },
    {
      field: 'no_rekam_medis', header: 'RM'
    },
    {
      field: 'hand_phone', header: 'Hand Phone',
    },
    {
      field: 'gender', header: 'Gender'
    },
    {
      field: 'tgl_lahir', header: 'Tgl Lahir', type: 'date'
    },
      // {
      //   type: 'button',
      //   header: 'Actions',
      //   button: [
      //     {
      //       buttonLabel: '',
      //       buttonIcon: 'pi pi-pencil',
      //       buttonClass: 'p-button-sm p-button-warning p-button-rounded p-button-outlined',
      //       onClick: (rowData: any) => this.editRow(rowData)
      //     },
      //     {
      //       buttonLabel: '',
      //       buttonIcon: 'pi pi-trash',
      //       buttonClass: 'p-button-sm p-button-danger p-button-rounded p-button-outlined',
      //       onClick: (rowData: any) => this.deleteRow(rowData)
      //     }
      //   ]

      // }],
    ],
    datasource: [],
    pagination: 20,
    toolbars: ['Add', 'Edit'],
    filteredBy: ['no_identitas', 'full_name']
  }

  selectedPasien: any

  inputState: 'input' | 'edit' = 'input'
  constructor(
    private patientService: PatientService,
    private utilityService: UtilityService,
    private store: Store,
    private formBuilder: FormBuilder,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.onGetDataSource()
    this.setAttributeForm()
    this.getNationality()
    this.selectedGender = this.Gender[1]
    this.patientService.getAllAgama()
      .subscribe(result => {
        this.Agama = result.data.map(item => ({ label: item.agama, value: item.id_agama }))
      })
    this.patientService.getAllJobType()
      .subscribe(result => {
        this.JobType = result.data.map(item => ({ label: item.job_type, value: item.id_job_type }))
      })

    
  }

  getNationality(): void {
    this.store.select(KewarganegaraanState.selectAllWargaNegaraGet).subscribe(result => {
      if (Array.isArray(result?.WN)) {
        this.Nationality = result.WN.map((el: any) => ({
          label: el.nama_kebangsaan,
          value: el.id_kebangsaan
        }));
      } else {
        console.warn('result?.WN is not an array:', result?.WN);
        this.Nationality = []; // Default to an empty array if not an array
      }
    })
  }

  onFormatDate(data: any) {
    return formatDate(data, 'yyyy-MM-dd', 'EN')
  }

  onGetDataSource(): void {
    this.store.select(PatientState.SelGetPatients).subscribe(result => {
      this.tableProps.datasource = result.patient
    })
  }

  setAttributeForm(): void {
    this.FormInputPasien = this.formBuilder.group({
      id_person: [null],
      nik: [null],
      no_identitas: [null],
      no_kartu_keluarga: [null],
      nama_lengkap: [null],
      phone: [null],
      alamat: [null],
      email: [null],
      gender: [null],
      kota: [null],
      tanggal_lahir: [null],
      tempat_lahir: [null],
      panggilan: [null],
      kebangsaan: [null],
      agama: [null],
      job_type: [null]
    })

    // this.FormInputPasien.get('agama')?.setValue(this.Agama[3])

  }

  setFormPerson(data: any) {

    this.FormInputPasien.setValue({
      id_person: data.person.id_person,
      nik: data.person.no_identitas,
      no_identitas: data.person.no_identitas,
      no_kartu_keluarga: data.person.no_kartu_keluarga,
      nama_lengkap: data.person.nama_depan,
      phone: data.kontak_person[0]['hand_phone'],
      alamat: data.alamat_person[0]['alamat_lengkap'],
      email: '',
      gender: data.person.gender,
      kota: '',
      tanggal_lahir: new Date(data.person.tanggal_lahir),
      tempat_lahir: data.person.tempat_lahir,
      panggilan: data.person.nama_panggilan,
      agama:data.person.id_agama,
      job_type: data.person.id_job_type,
      kebangsaan: ''
    })

  }

  handleSlectedAgama(args:any):void{
    console.log(args)
  }

  handleSelectedRow(args: any): void {
    this.selectedPasien = args.data
  }

  handleToolbarClick(args: any): void {
    if (args == 'Add') {
      this.inputState = 'input'
      this.visible = true
      // this.router.navigateByUrl('Patient/add-patient')
    } else if (this.selectedPasien) {
      if (args == 'Edit') {
        this.inputState = 'edit'
        this.visible = true
        this.setForm(this.selectedPasien)
      } else if (args == 'Delete') {
        this.deleteRow(this.selectedPasien)
      }
    }

  }

  handleClickSubmit(): void {
    if (this.inputState === "input") {

      const data:InsertPersonRequest = this.FormInputPasien.value
      
      this.patientService.insertPersonLogic(data)
      .then((response:any)=>{
        console.log(response)
      })
    
    }
    //   this.patientService.insertPerson({
    //     tanggal_lahir: (data.tanggal_lahir as Date).toUTCString(),
    //     id_kebangsaan: data.kebangsaan.value,
    //     id_job_type: data.job_type.value,
    //     id_agama: data.agama.value,
    //     no_identitas: data.no_identitas,
    //     no_kartu_keluarga: data.no_kartu_keluarga,
    //     id_member: 0,
    //     is_member: false,
    //     nama_lengkap: data.nama_lengkap,
    //     phone: data.phone,
    //     alamat: data.alamat,
    //     email: data.email,
    //     gender: data.gender.value,
    //     kota: data.kota,
    //     panggilan: data.panggilan,
    //     tempat_lahir: data.tempat_lahir
    //   })
    //     .subscribe(res => {
    //       if (res.responseResult) {
    //         this.utilityService.onSuccessToast("Data berhasil ditambahkan")
    //         this.store.dispatch(new GetPatient())
    //         this.visible = false
    //         this.ResetForm()
    //       }
    //     })
    // } else if (this.inputState === "edit") {
    //   const data = this.FormInputPasien.value
    //   this.patientService.updatePerson({
    //     id_person: data.id_person,
    //     tanggal_lahir: (data.tanggal_lahir as Date).toUTCString(),
    //     id_kebangsaan: data.kebangsaan.value,
    //     id_job_type: data.job_type.value,
    //     id_agama: data.agama.value,
    //     no_identitas: data.no_identitas,
    //     no_kartu_keluarga: data.no_kartu_keluarga,
    //     id_member: 0,
    //     is_member: false,
    //     nama_lengkap: data.nama_lengkap,
    //     phone: data.phone,
    //     alamat: data.alamat,
    //     email: data.email,
    //     gender: data.gender.value,
    //     kota: data.kota,
    //     panggilan: data.panggilan,
    //     tempat_lahir: data.tempat_lahir
    //   })
    //     .subscribe(res => {
    //       if (res.responseResult) {
    //         this.utilityService.onSuccessToast("Data berhasil ditambahkan")
    //         this.store.dispatch(new GetPatient())
    //         this.visible = false
    //         this.ResetForm()
    //       }
    //     })
    // }
  }

  setForm(data: any): void {
    this.utilityService.onShowLoadingBeforeSend()
    this.patientService.onGetPersonPasienDetailByPersonId(data.id_person)
      .pipe(takeUntil(this.$Destroy))
      .subscribe(result => {
        Swal.close()
        if (result && result.responseResult) {
          this.setFormPerson(result.data)
        }
      })
  }

  setKebangsaan(value: number): void {
    // Update the form control value
    this.FormInputPasien.patchValue({ id_kebangsaan: value });
    let nama_kebangsaan = this.Nationality.find((el) => (el.value == value))
    // Update the dropdown model value
    this.NationalitySelect = { text: value, value: nama_kebangsaan?.label };

    console.log(this.NationalitySelect)
  }


  setGender(value: any): void {
    let gender = this.Gender.find((el: any) => (el.value == value))
    this.selectedGender = gender
    console.log("Cek Gender ==> ", gender)
    this.FormInputPasien.get("gender")?.setValue(gender?.value)
  }


  deleteRow(args: any): void {
    console.log(args)
    this.utilityService.onShowingConfirmationAlert('info', 'Perhatian', 'Apakah Anda Ingin Menghapus Data ini', () => {
      this.visible = false
      this.utilityService.onSuccessToast('Data Sukses di Hapus !')
    }, () => {
      this.visible = false
    })
  }

  onSearch(args: any): void {
    console.log(args)
  }

  handleClickCancelInput(): void {
    this.visible = false
    if (this.FormInputPasien.dirty) {
      this.utilityService.onShowingConfirmationAlert(
        'info',
        'Perhatian',
        'Data Inputan akan hilang jika anda batalkan ',
        () => {
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

  ResetForm(): void {
    this.FormInputPasien.reset()
  }

  HandleDoubleClickRow(args: any): void {
    console.log('Doubtle Click', args)
  }

  ngOnDestroy(): void {
    this.$Destroy.next(null)
    this.$Destroy.complete()
  }
}
