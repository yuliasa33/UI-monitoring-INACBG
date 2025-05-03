import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from "../../../components/layout/layout.component";
import { ChartModule } from 'primeng/chart';
import { Store } from '@ngxs/store';
import { GetAllItem } from 'src/app/database/store/database-action/data-item.action';
import { AppComponent } from 'src/app/app.component';
import { ApexAxisChartSeries, ApexXAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from 'chart.js';
import { MolTableComponent } from "../../../components/molecules/mol-table/mol-table.component";
import { TableProps } from 'src/app/components/models/tableProps.model';
import * as CONF from './json/config.json'
import { TableModule } from 'primeng/table';
import { MolDialogComponent } from "../../../components/molecules/mol-dialog/mol-dialog.component";
import { DialogCompsModels } from 'src/app/components/models/dialogCompsModel';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CookieService } from 'ngx-cookie-service';
import { static_token } from 'src/environment/environment';
import { SetupCaraMasukService } from 'src/app/shared/service/setup-cara-masuk/setup-cara-masuk.service';
import { SetupJenisRawatService } from 'src/app/shared/service/setup-jenis-rawat/setup-jenis-rawat.service';
import { SetupCaraPulangService } from 'src/app/shared/service/setup-cara-pulang/setup-cara-pulang.service';
import { SetupIcd10Service } from 'src/app/shared/service/setup-icd-10/setup-icd-10.service';
import { InputLookupComponent } from "../../../components/organism/input-lookup/input-lookup.component";
import { TooltipModule } from 'primeng/tooltip';
import { InacbgService } from 'src/app/shared/service/INACBG/inacbg.service';
import { INACBG } from 'src/app/shared/model/inacbg.mode';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LayoutComponent, MultiSelectModule, ReactiveFormsModule, FormsModule, ChartModule, TooltipModule, DropdownModule, NgApexchartsModule, TableModule, MolTableComponent, MolDialogComponent, InputTextModule, InputNumberModule, CalendarModule, InputLookupComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {

  lineChartData: any
  lineChartOptions: any

  pieChartData: any
  pieChartOptions: any

  barChartData: any
  barChartOptions: any

  apexLinechartOptions: any
  radarOptions: any

  JSONCONF = CONF

  modifiedData = this.JSONCONF.DummyDatasource.map(el => ({
    ...el,
    selisih_persen: `${el.selisih_persen}%`
  }))

  formState: 'claim' | 'detail' = 'detail'
  formClaim!: FormGroup
  contextItem = [
    {
      label: 'Claim',
      icon: 'pi pi-flag',
      command: (e: any) => {
        this.onClaim(e)
      }
    }
    // {
    //   label: 'Detail',
    //   icon: 'pi pi-eye',
    //   command:(e:any)=>{
    //     this.setDetail()
    //   }
    // }
  ]

  caraMasukOptions: any[] = []
  caraPulangOptions = this.JSONCONF.DummyCaraPulang
  diagnosaOptions = this.JSONCONF.DummyICD10
  procedureOptions = this.JSONCONF.DummyICD9
  jenisRawatOptions = this.JSONCONF.DummyJenisRawat

  @ViewChild('GridTable') GridTable!: MolTableComponent

  public tableProps: TableProps.Table = {
    columns: [
      ...this.JSONCONF.GridColumns
    ],
    datasource:[],
    pagination: 10,
    filteredBy: [],
    toolbars: []
  }

  DialogAttributes: DialogCompsModels.Attributes = {
    Headers: `Data CLAIM Pasien `,
    Style: {
      height: 'calc(100vh - 12rem)',
      width: 'calc(100vw - 32rem)'
    },
    position: 'center'
  }

  selectedData: any

  @ViewChild('claimDialog') claimDialog!: MolDialogComponent

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: any;

  Form!: FormGroup

  state_total_nilai_billing: any = 0
  state_total_nilai_claim: any = 0
  state_total_presentase: any = 0

  // tableDiagnosa: TableProps.Table = {
  //   columns: [
  //     {
  //       header: 'id', field: 'id', style: "display:none",
  //     },
  //     { header: 'kode_icd_10', field: 'Kode', },
  //     { header: 'nama_icd_10', field: 'id' },
  //   ],
  //   datasource: [],
  //   pagination: 100,
  //   filteredBy: [],
  // }

  selectedItemDiagnosa: any[] = []
  selectedItemProcedure: any[] = []

  kode_icd_10_icacbg:any[] = []
  nama_icd_10_icacbg:any[] = []

  kode_icd_9_icacbg:any[] = []
  nama_icd_9_icacbg:any[] = []

  constructor(private store: Store,
    private formBuilder: FormBuilder,
    private cookiesService: CookieService,
    private setupCaraMasukService: SetupCaraMasukService,
    private setupJenisRawatService: SetupJenisRawatService,
    private setupCaraPulangService: SetupCaraPulangService,
    private setupIcd10Service: SetupIcd10Service,
    private inacbgService:InacbgService,
    private utilityService:UtilityService
  ) { }

  ngOnInit(): void {
    this.onSetAttrtibuteForm()
    this.getSetup()
    this.onGetPendaftaran()
  }

  ngAfterViewInit(): void {

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

  onGetPendaftaran():void{
    this.inacbgService.getAllPendaftaran().subscribe(result=>{
      this.tableProps.datasource = result.data
      this.SummaryTotal()
    })
  }

  SummaryTotal(): void {
    this.state_total_nilai_billing =this.tableProps.datasource.reduce((sum: any, item: any) => sum + item.nilai_billing, 0)
    this.state_total_nilai_claim = this.tableProps.datasource.reduce((sum: any, item: any) => sum + item.nilai_klaim, 0)
    const total_prosentase = this.tableProps.datasource.reduce((sum: any, item: any) => sum + item.selisih_persen, 0)
    const jumlah_datasource = this.tableProps.datasource.length
    this.state_total_presentase = total_prosentase / jumlah_datasource

    console.log(this.tableProps.datasource)
  }

  onSetAttrtibuteForm(): void {
    this.Form = this.formBuilder.group({
      no_pendaftaran: [''],
      nik: [''],
      no_rm: [''],
      nama_pasien: [''],
      no_sep: [''],
      no_kartu: [''],
      nilai_klaim: [''],
      nilai_billing: [''],
      selisih_persen: [''],
      jumlah_hari: [''],
      tanggal_masuk: [''],
      tanggl_keluar: [''],
    })

    this.formClaim = this.formBuilder.group({
      no_pendaftaran: [''],
      nik: [''],
      no_rm: [''],
      nama_pasien: [''],
      no_sep: [''],
      tanggal_masuk: [null],
      tanggal_keluar: [''],
      cara_masuk: ['',[Validators.required]],
      jenis_rawat: ['',[Validators.required]],
      cara_pulang: ['',[Validators.required]],
      diagnosa: [[]],
      procedure: [[]],
    });
  }

  getRowClass(row: any): string {

    const selisih = row.selisih_persen
    if (selisih < 70) {
      return 'rowBgGreen';
    } else if (selisih >= 70 && selisih <= 90) {
      return 'rowBgYellow';
    } else if (selisih > 90 && selisih <= 100) {
      return 'rowBgOrange';
    } else if (selisih > 100) {
      return 'rowBgRed';
    }
    return ''
  }

  onSetForm(FormValue: any): void {
    this.formClaim.get('no_pendaftaran')?.setValue(FormValue.no_pendaftaran)
    this.formClaim.get('nik')?.setValue(FormValue.nik)
    this.formClaim.get('no_rm')?.setValue(FormValue.no_rm)
    this.formClaim.get('no_sep')?.setValue(FormValue.no_sep)
    this.formClaim.get('nama_pasien')?.setValue(FormValue.nama_pasien)
    this.formClaim.get('tanggal_masuk')?.setValue(new Date(FormValue.tanggal_masuk))
    this.formClaim.get('tanggal_keluar')?.setValue(new Date(FormValue.tanggl_keluar))
  }

  openModalClaim(): void {
    this.claimDialog.visibility = true
  }

  closeModalClaim(): void {
    this.resetClaimForm()
    this.resetForm()
    this.claimDialog.visibility = false
  }

  onClaim(data: any): void {
    this.DialogAttributes.Headers = `Claim Pasien An ${this.selectedData.nama_pasien}`
    this.openModalClaim()
    this.formState = 'claim'
    this.onSetForm(this.selectedData)
    console.log(this.selectedData)
  }

  selectedDataRightClick(args: any): void {
    this.selectedData = args.data
  }

  setDetail(): void {
    this.DialogAttributes.Headers = `Data Detail Pasien An ${this.selectedData.nama_pasien}`
    this.openModalClaim()
    // this.onSetForm(this.selectedData)
    this.formState = 'detail'
  }

  formattedValue: any
  formatCurrency(event: any) {
    const rawValue = event.target.value.replace(/\D/g, ''); // Hanya angka
    const formatted = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Tambahkan titik
    this.formattedValue = formatted;
  }

  resetForm(): void {
    this.Form.reset()
    this.selectedItemDiagnosa = []
    this.selectedItemProcedure = []
  }

  resetClaimForm(): void {
    this.formClaim.reset()
  }

  handleClaimForm(form: any): void {
    // if(this.formClaim.invalid){

    // }
    console.log(this.formClaim)
    let payload:INACBG.CLAIMINACBG = {
      no_pendaftaran: form.no_pendaftaran,
      nik: form.nik,
      no_rm: form.no_rm,
      nama_pasien: form.nama_pasien,
      no_sep: form.no_sep,
      no_kartu: form.no_kartu,
      nilai_klaim: this.selectedData.nilai_klaim,
      nilai_billing: this.selectedData.nilai_billing,
      selisih_persen: this.selectedData.selisih_persen,
      jumlah_hari: this.selectedData.jumlah_hari | 0,
      tanggal_masuk: form.tanggal_masuk,
      tanggl_keluar: form.tanggal_keluar,
      kode_icd10_inacbg: this.kode_icd_10_icacbg,
      kode_icd10_simgos: this.selectedData.kode_icd10_simgos,
      diagnosa_inacbg: this.nama_icd_10_icacbg,
      diagnosa_simgos: this.selectedData.diagnosa_simgos,
      kode_icd9_inacbg: this.kode_icd_9_icacbg,
      kode_icd9_simgos: this.selectedData.kode_icd9_simgos,
      procedure_inacbg: this.nama_icd_9_icacbg,
      procedure_simgos: this.selectedData.procedure_simgos,
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
        this.resetForm()
        this.claimDialog.handleCloseModal()
        this.utilityService.onSuccessToast('Claim Berhasil !')
        this.onGetPendaftaran()
      }else{
        this.utilityService.onFailedToast(result.message)
      }
    })
  }

  onChangeDiagnosa(args: any): void {
    let items = args.value.map((result: any) => {
      return result.label
    })
    this.selectedItemDiagnosa = items
    this.kode_icd_10_icacbg = items.map((item:any) => item.split(' - ')[0]);
    this.nama_icd_10_icacbg = items.map((item:any) => item.split(' - ')[1]);
    console.log(this.selectedItemDiagnosa)
  }

  onChangeProcedure(args: any): void {
    let items = args.value.map((result: any) => {
      return result.label
    })
    this.selectedItemProcedure = items
    this.kode_icd_9_icacbg = items.map((item:any) => item.split(' - ')[0]);
    this.nama_icd_9_icacbg = items.map((item:any) => item.split(' - ')[1]);
    console.log(this.selectedItemDiagnosa)
  }


}

