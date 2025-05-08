import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutComponent } from "../../../components/layout/layout.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { InacbgService } from 'src/app/shared/service/INACBG/inacbg.service';
import { CommonModule } from '@angular/common';
import { ButtonNavModel } from 'src/app/components/models/buttonNavModel';
import { SetupCaraMasukService } from 'src/app/shared/service/setup-cara-masuk/setup-cara-masuk.service';
import { SetupJenisRawatService } from 'src/app/shared/service/setup-jenis-rawat/setup-jenis-rawat.service';
import { SetupCaraPulangService } from 'src/app/shared/service/setup-cara-pulang/setup-cara-pulang.service';
import { SetupIcd10Service } from 'src/app/shared/service/setup-icd-10/setup-icd-10.service';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { ChipModule } from 'primeng/chip';
import { INACBG } from 'src/app/shared/model/inacbg.mode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-claim',
  standalone: true,
  imports: [LayoutComponent, ChipModule, ReactiveFormsModule, CommonModule, FormsModule, CalendarModule, InputTextModule, MultiSelectModule, DropdownModule, TooltipModule],
  templateUrl: './input-claim.component.html',
  styleUrl: './input-claim.component.scss'
})
export class InputClaimComponent implements OnInit, OnDestroy {

  ButtonNav: ButtonNavModel[] = [
    {
      icons: 'pi pi-arrow-left', id: 'back', styleClass: 'p-button-sm p-button-danger p-button-raised', text: 'Back'
    },
    {
      icons: 'pi pi-save', id: 'save', styleClass: 'p-button-sm p-button-primary p-button-raised', text: 'Save'
    }
  ]

  formClaim!: FormGroup

  caraMasukOptions: any[] = []
  jenisRawatOptions: any[] = []
  caraPulangOptions: any[] = []
  diagnosaOptions: any[] = []
  procedureOptions: any[] = []
  selectedItemDiagnosa: any[] = []
  selectedItemProcedure: any[] = []

  selectedDiagnosaSimgos: any
  selectedDiagnosaINACBG: any[] = []

  selectedProcedureINACBG: any[] = []
  selectedProcedureSIMGOS: any[] = []

  selected_displayed_inacbg: any
  selected_displayed_procedure:any


  constructor(private formBuilder: FormBuilder,
    private inaCBGService: InacbgService,
    private setupCaraMasukService: SetupCaraMasukService,
    private setupJenisRawatService: SetupJenisRawatService,
    private setupCaraPulangService: SetupCaraPulangService,
    private setupIcd10Service: SetupIcd10Service,
    private utilityService: UtilityService,
    private inacbgService:InacbgService,
    private router:Router
  ) {

  }

  ngOnInit(): void {
    this.onSetAttrtibuteForm()
    this.onGetDataINACBG()
    this.getSetup()
  }

  ngOnDestroy(): void {
    this.inaCBGService.DestroyDataClaim()
  }

  handleClickButtonNav(args: any): void {
    console.log(args)
    switch(args){
      case'save':
      this.onSave()
      break;
      case 'back':
        this.onBack()
        break;
        default:
          break;
    }
  }

  getSetup(): void {
    this.setupCaraMasukService.setDataSource()
    this.setupJenisRawatService.setDataSource()
    this.setupCaraPulangService.setDataSource()

    setTimeout(() => {
      this.setupIcd10Service.getDataICD10Service().subscribe(result => {
        this.diagnosaOptions = result.data.rows
        this.diagnosaOptions = this.diagnosaOptions.map((item: any) => ({
          ...item,
          label: `${item.kode_icd_10} - ${item.nama_icd_10}`,
          value: item.kode_icd_10
        }))
      })
      this.setupIcd10Service.getDataICD9Service().subscribe(result => {
        this.procedureOptions = result.data.rows
        this.procedureOptions = this.procedureOptions.map((item: any) => ({
          ...item,
          label: `${item.kode_icd_9} - ${item.nama_icd_9}`,
          value: item.kode_icd_9
        }))
      })
      this.caraMasukOptions = this.setupCaraMasukService.ListSetupCaraMasuk$.getValue()
      this.jenisRawatOptions = this.setupJenisRawatService.ListSetupJenisRawat$.getValue()
      this.caraPulangOptions = this.setupCaraPulangService.ListCaraPulang$.getValue()
    }, 800)

  }

  onGetDataINACBG(): void {
    const result = this.inaCBGService.onGetDataClaim()
    console.log(result)
    this.formClaim.get('no_pendaftaran')?.setValue(result.no_pendaftaran)
    this.formClaim.get('nik')?.setValue(result.nik)
    this.formClaim.get('no_rm')?.setValue(result.no_rm)
    this.formClaim.get('no_sep')?.setValue(result.no_sep)
    this.formClaim.get('nama_pasien')?.setValue(result.nama_pasien)
    this.formClaim.get('tanggal_masuk')?.setValue(new Date(result.tanggal_masuk))
    this.formClaim.get('tanggal_keluar')?.setValue(new Date(result.tanggl_keluar))

    // let trimmedDiagnosa: any = result.diagnosa_simgos.map((d: any) => d.trim());
    // this.selectedDiagnosaSimgos = this.diagnosaOptions.filter((opt: any) =>trimmedDiagnosa.includes(opt.nama_icd_10.trim())
    // );
    this.selectedDiagnosaSimgos = result.kode_icd10_simgos.map((code: any, index: any) => ({
      index: index,
      code: code,
      label: result.diagnosa_simgos[index]
    }));

    this.selectedProcedureSIMGOS = result?.kode_icd_9?.map((code: any, index: any) => ({
      index: index,
      code: code,
      label: result?.procedure_simgos[index]
    }));

  }

  onSetAttrtibuteForm(): void {

    this.formClaim = this.formBuilder.group({
      no_pendaftaran: [''],
      nik: [''],
      no_rm: [''],
      nama_pasien: [''],
      no_sep: [''],
      tanggal_masuk: [null],
      tanggal_keluar: [''],
      cara_masuk: ['', [Validators.required]],
      jenis_rawat: ['', [Validators.required]],
      cara_pulang: ['', [Validators.required]],
      diagnosa: [[]],
      procedure: [[]],
      diagnosa_simgos: [[]],
      procedure_simgos: [[]]
    });
  }

  onChangeDiagnosa(args: any): void {

  }

  onChangeProcedure(args: any): void {

  }
// Diagnosa Segments ====================================================================================
  handleChangeDiagnosaINACBG(args: any): void {
    try{
      const newItem = {
        code: args.value.kode_icd_10,
        label: args.value.nama_icd_10
      };
  
      // Cek apakah kode sudah ada (untuk hindari duplikat)
      const exists = this.selectedDiagnosaINACBG.some(item => item.code === newItem.code);
      if (exists) return;
  
      // Tambahkan item baru
      this.selectedDiagnosaINACBG.push(newItem);
  
      // Perbarui ulang index semua item
      this.selectedDiagnosaINACBG = this.selectedDiagnosaINACBG.map((item, index) => ({
        ...item,
        index: index
      }));
      this.utilityService.onSuccessToast('Berhasil Tambah Data')
      console.log(this.selectedDiagnosaINACBG);
    }catch(error){
      this.utilityService.onFailedToast(error)
    }
    

  }

  handleClickItemDiagnosaINACBG(args: any): void {
    console.log(args)
    this.selected_displayed_inacbg = args
  }

  onSetPrimerDiagnosa(inacbg: any): void {
    console.log(inacbg)
    const selecetedIndex = this.selectedDiagnosaINACBG.findIndex(item => item === inacbg)
    if (selecetedIndex > 0) {
      // Pindahkan item yang dipilih ke posisi 0
      this.selectedDiagnosaINACBG.splice(selecetedIndex, 1);        // Hapus dari posisi awal
      this.selectedDiagnosaINACBG.unshift(inacbg);           // Tambahkan di awal

      // Re-index semua item agar tidak ada duplikat index
      this.selectedDiagnosaINACBG.forEach((item, idx) => {
        item.index = idx;
      });
    }
    console.log(this.selectedDiagnosaINACBG)

    this.utilityService.customToast('warn','Info',inacbg.label + 'Set Primer','pi pi-star')
  }

  onDeleteSelectedDiagnosaINACBG(inacbg: any): void {
    // this.displayed_diagnosa_INACBG = this.displayed_diagnosa_INACBG.filter(item => item !== inacbg);

    // // Perbarui ulang index setelah penghapusan
    // this.displayed_diagnosa_INACBG.forEach((item, idx) => {
    //   item.index = idx;
    // });
    // this.selectedDiagnosaINACBG.splice(inacbg.index, 1)
    // this.selected_displayed_inacbg = null

        // Hapus item dari array
  this.selectedDiagnosaINACBG = this.selectedDiagnosaINACBG.filter(item => item.code !== inacbg.code);

  // Perbarui ulang index semua item
  this.selectedDiagnosaINACBG = this.selectedDiagnosaINACBG.map((item, index) => ({
    ...item,
    index: index
  }));
    console.log("AFTER DLETE==>", this.selectedDiagnosaINACBG)
    console.log(this.selectedItemDiagnosa)
    console.log(this.selected_displayed_inacbg)

    this.utilityService.customToast('error','Perhatian',inacbg.label + 'Berhasil Delete','pi pi-exclamation-triangle')
  }

  trackByCode(index: number, item: any) {
    return item.code; // atau item.id kalau punya
  }

  handleChangeSelectedDiagnosa(diagnosa_inacbg: any): void {
    console.log(diagnosa_inacbg)
    const data = diagnosa_inacbg.value
    const transformeddata = {
      code: data.kode_icd_10,
      label: data.nama_icd_10
    }
    this.selectedDiagnosaINACBG[this.selected_displayed_inacbg.index] = transformeddata
    this.selected_displayed_inacbg = null
  }


  //PROCEDURE SEGMENTS ==========================================================================================================

  handleChangeProcedureINACBG(args: any): void {
    const newItem = {
      code: args.value.kode_icd_9,
      label: args.value.nama_icd_9
    };

    // Cek apakah kode sudah ada (untuk hindari duplikat)
    const exists = this.selectedProcedureINACBG.some(item => item.code === newItem.code);
    if (exists) return;

    // Tambahkan item baru
    this.selectedProcedureINACBG.push(newItem);

    // Perbarui ulang index semua item
    this.selectedProcedureINACBG = this.selectedProcedureINACBG.map((item, index) => ({
      ...item,
      index: index
    }));
    this.utilityService.onSuccessToast('Berhasil Tambah Data')
    console.log(this.selectedProcedureINACBG);

  }

  handleClickItemProcedureINACBG(args: any): void {
    console.log(args)
    this.selected_displayed_procedure = args
  }

  handleChangeSelectedProcedure(procedure_inacbg: any): void {
    console.log(procedure_inacbg)
    const data = procedure_inacbg.value
    const transformeddata = {
      code: data.kode_icd_10,
      index: this.selected_displayed_inacbg.index,
      label: data.nama_icd_10
    }
    this.selectedProcedureINACBG[this.selected_displayed_procedure.index] = transformeddata
    this.selected_displayed_procedure = null
  }

  onDeleteSelectedProcedureINACBG(inacbg: any): void {
    this.selectedProcedureINACBG = this.selectedProcedureINACBG.filter(item => item.code !== inacbg.code);

  // Perbarui ulang index semua item
  this.selectedProcedureINACBG = this.selectedProcedureINACBG.map((item, index) => ({
    ...item,
    index: index
  }));
    
    this.utilityService.customToast('error','Perhatian',inacbg.label + 'Berhasil Delete','pi pi-exclamation-triangle')

  console.log("AFTER DLETE==>", this.selectedProcedureINACBG)

  }

  onSetPrimerProcedure(inacbg: any): void {
    console.log(inacbg)
    const selecetedIndex = this.selectedProcedureINACBG.findIndex(item => item === inacbg)
    if (selecetedIndex > 0) {
      // Pindahkan item yang dipilih ke posisi 0
      this.selectedProcedureINACBG.splice(selecetedIndex, 1);        // Hapus dari posisi awal
      this.selectedProcedureINACBG.unshift(inacbg);           // Tambahkan di awal

      // Re-index semua item agar tidak ada duplikat index
      this.selectedProcedureINACBG.forEach((item, idx) => {
        item.index = idx;
      });
    }
    this.utilityService.customToast('warn','Info',inacbg.label + 'Set Primer','pi pi-star')
    console.log(this.selectedProcedureINACBG)
  }

  onBack():void{
    this.router.navigateByUrl('')
  }

  //Save Segmentes

  onSave():void{

    let diagnosa = this.selectedDiagnosaINACBG.map((result: any) => {
      return result.label
    })
    const kode_icd_10_icacbg = diagnosa.map((item:any) => item.split(' - ')[0]);
    const nama_icd_10_icacbg = diagnosa.map((item:any) => item.split(' - ')[1]);

    let procedure = this.selectedDiagnosaINACBG.map((result: any) => {
      return result.label
    })
    const kode_icd_9_icacbg = procedure.map((item:any) => item.split(' - ')[0]);
    const nama_icd_9_icacbg = procedure.map((item:any) => item.split(' - ')[1]);

    const form = this.formClaim.value
     console.log(this.formClaim)
        let payload:INACBG.CLAIMINACBG = {
          no_pendaftaran: form.no_pendaftaran,
          nik: form.nik,
          no_rm: form.no_rm,
          nama_pasien: form.nama_pasien,
          no_sep: form.no_sep,
          no_kartu: form.no_kartu,
          nilai_klaim: this.inaCBGService.SelectedDataClaimObserver.value.nilai_klaim,
          nilai_billing: this.inaCBGService.SelectedDataClaimObserver.value.nilai_billing,
          selisih_persen: this.inaCBGService.SelectedDataClaimObserver.value.selisih_persen,
          jumlah_hari: this.inaCBGService.SelectedDataClaimObserver.value.jumlah_hari | 0,
          tanggal_masuk: form.tanggal_masuk,
          tanggl_keluar: form.tanggal_keluar,
          kode_icd10_inacbg: kode_icd_10_icacbg,
          kode_icd10_simgos: this.inaCBGService.SelectedDataClaimObserver.value.kode_icd10_simgos,
          diagnosa_inacbg: nama_icd_10_icacbg,
          diagnosa_simgos: this.inaCBGService.SelectedDataClaimObserver.value.diagnosa_simgos,
          kode_icd9_inacbg: kode_icd_9_icacbg,
          kode_icd9_simgos: this.inaCBGService.SelectedDataClaimObserver.value.kode_icd9_simgos,
          procedure_inacbg: nama_icd_9_icacbg,
          procedure_simgos: this.inaCBGService.SelectedDataClaimObserver.value.procedure_simgos,
          jenis_rawat: form.jenis_rawat.nama_jenis_rawat,
          kode_jenis_rawat: form.jenis_rawat.kode_jenis_rawat,
          cara_masuk: form.cara_masuk.nama_cara_masuk,
          keterangan_cara_masuk: form.cara_masuk.keterangan,
          cara_pulang: form.cara_pulang.cara_pulang,
          kode_cara_pulang: form.cara_pulang.kode_cara_pulang
        }
    
        console.log(JSON.stringify(payload))
         this.inacbgService.onClaimINACBG(payload).subscribe(result=>{
           console.log(result)
           if(result.responseResult){
            this.resetClaimForm()
             this.utilityService.onShowingCustomAlert('success','Yeayy Berhasil Claim nih',result.message)
             .then(()=>{
              this.onBack()
             })
           }else{
             this.utilityService.onFailedToast(result.message)
           }
         })
  }


  resetClaimForm(): void {
    this.formClaim.reset()
  }


}
