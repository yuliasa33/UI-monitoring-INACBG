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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CookieService } from 'ngx-cookie-service';
import { static_token } from 'src/environment/environment';
import { SetupCaraMasukService } from 'src/app/shared/service/setup-cara-masuk/setup-cara-masuk.service';
import { SetupJenisRawatService } from 'src/app/shared/service/setup-jenis-rawat/setup-jenis-rawat.service';
import { SetupCaraPulangService } from 'src/app/shared/service/setup-cara-pulang/setup-cara-pulang.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LayoutComponent,MultiSelectModule,ReactiveFormsModule,FormsModule, ChartModule,DropdownModule, NgApexchartsModule, TableModule, MolTableComponent, MolDialogComponent,InputTextModule,InputNumberModule,CalendarModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit ,AfterViewInit {
  
  lineChartData: any
  lineChartOptions: any

  pieChartData:any
  pieChartOptions:any

  barChartData:any
  barChartOptions:any

  apexLinechartOptions:any
  radarOptions:any

  JSONCONF = CONF

  modifiedData = this.JSONCONF.DummyDatasource.map(el=>({
    ...el,
    selisih_persen:`${el.selisih_persen}%`
  }))

  formState:'claim' | 'detail' = 'detail'
  formClaim!:FormGroup
  contextItem = [
    {
      label: 'Claim',
      icon: 'pi pi-flag',
      command:(e:any)=>{
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

  caraMasukOptions:any[] = []
  caraPulangOptions = this.JSONCONF.DummyCaraPulang
  diagnosaOptions = this.JSONCONF.DummyICD10
  procedureOptions = this.JSONCONF.DummyICD9
  jenisRawatOptions = this.JSONCONF.DummyJenisRawat

  @ViewChild('GridTable') GridTable!:MolTableComponent
 
  public tableProps:TableProps.Table = {
    columns:[
    ...this.JSONCONF.GridColumns
    ],
    datasource:this.JSONCONF.DummyDatasource,
    pagination:10,
    filteredBy:[],
    toolbars:[]
  }

  DialogAttributes:DialogCompsModels.Attributes ={
    Headers:`Data CLAIM Pasien `,
    Style:{
      height:'900px',
      width:'900px'
    },
    position:'center'
  }

  selectedData:any

  @ViewChild('claimDialog') claimDialog!:MolDialogComponent

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: any;

  Form!:FormGroup

  state_total_nilai_billing:any = 0
  state_total_nilai_claim:any =0
  state_total_presentase:any = 0

  constructor(private store:Store,
              private formBuilder:FormBuilder,
              private cookiesService:CookieService,
              private setupCaraMasukService:SetupCaraMasukService,
              private setupJenisRawatService:SetupJenisRawatService,
              private setupCaraPulangService:SetupCaraPulangService
  ) {}

  ngOnInit(): void {
    // this.store.dispatch(new GetAllItem())
    this.onSetAttrtibuteForm()
    this.SummaryTotal()
    this.getSetup()
  }

  ngAfterViewInit(): void {
    
  }

  getSetup():void{
    this.setupCaraMasukService.setDataSource()
    this.setupJenisRawatService.setDataSource()
    this.setupCaraPulangService.setDataSource()
    setTimeout(()=>{
      this.caraMasukOptions = this.setupCaraMasukService.ListSetupCaraMasuk$.getValue()
      this.jenisRawatOptions = this.setupJenisRawatService.ListSetupJenisRawat$.getValue()
      this.caraPulangOptions = this.setupCaraPulangService.ListCaraPulang$.getValue()
    },800)
    
  }

  SummaryTotal():void{
    this.state_total_nilai_billing = this.JSONCONF.DummyDatasource.reduce((sum:any,item:any)=>sum + item.nilai_billing,0)
    this.state_total_nilai_claim = this.JSONCONF.DummyDatasource.reduce((sum:any,item:any)=>sum + item.nilai_klaim,0)
    const total_prosentase = this.JSONCONF.DummyDatasource.reduce((sum:any,item:any)=>sum + item.selisih_persen,0)
    const jumlah_datasource = this.JSONCONF.DummyDatasource.length
    this.state_total_presentase =  total_prosentase / jumlah_datasource
  }

  onSetAttrtibuteForm():void{
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
      cara_masuk: [null],
      jenis_rawat: [null],
      cara_pulang: [null],
      diagnosa: [[]],
      procedure: [[]],
    });
  }
  
  getRowClass (row: any): string {

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

  onSetForm(FormValue:any):void{
    this.formClaim.get('no_pendaftaran')?.setValue(FormValue.no_pendaftaran)
    this.formClaim.get('nik')?.setValue(FormValue.nik)
    this.formClaim.get('no_rm')?.setValue(FormValue.no_rm)
    this.formClaim.get('no_sep')?.setValue(FormValue.no_sep)
    this.formClaim.get('nama_pasien')?.setValue(FormValue.nama_pasien)
    this.formClaim.get('tanggal_masuk')?.setValue(new Date(FormValue.tanggal_masuk))
    this.formClaim.get('tanggal_keluar')?.setValue(new Date(FormValue.tanggl_keluar))
  }

  openModalClaim():void{
    this.claimDialog.visibility = true
  }

  closeModalClaim():void{
    this.resetClaimForm()
    this.resetForm()
    this.claimDialog.visibility = false
  }

  onClaim(data:any):void{
     this.DialogAttributes.Headers = `Claim Pasien An ${this.selectedData.nama_pasien}`
    this.openModalClaim()
    this.formState = 'claim'
     this.onSetForm(this.selectedData)
    console.log(this.selectedData)
  }

  selectedDataRightClick(args:any):void{
    this.selectedData = args.data
  }

  setDetail():void{
    this.DialogAttributes.Headers = `Data Detail Pasien An ${this.selectedData.nama_pasien}`
    this.openModalClaim()
    // this.onSetForm(this.selectedData)
    this.formState = 'detail'
  }

  formattedValue:any
  formatCurrency(event: any) {
    const rawValue = event.target.value.replace(/\D/g, ''); // Hanya angka
    const formatted = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Tambahkan titik
    this.formattedValue = formatted;
  }

  resetForm():void{
    this.Form.reset()
  }

  resetClaimForm():void{
    this.formClaim.reset()
  }


  }

