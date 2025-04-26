import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LayoutComponent } from "../../../components/layout/layout.component";
import { InputLookupComponent } from "../../../components/organism/input-lookup/input-lookup.component";
import { InputLookUp } from 'src/app/components/models/inputLookupModel';
import { TableProps } from 'src/app/components/models/tableProps.model';
import { MolInputFieldsComponent } from "../../../components/molecules/mol-input-fields/mol-input-fields.component";
import { DropdownAttributeModel, MolDropdownComponent } from "../../../components/molecules/mol-dropdown/mol-dropdown.component";
import { MolTableComponent } from "../../../components/molecules/mol-table/mol-table.component";
import { ButtonNavModel } from 'src/app/components/models/buttonNavModel';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupComponent } from "../../../components/organism/lookup/lookup.component";
import { Store } from '@ngxs/store';
import { PatientState } from '../state/patient.state';
import * as MRCOnfig from './json/mrLookup.json'
import { DataPoliState } from 'src/app/database/store/database-state/data-poli.state';
import { DataTarifState } from 'src/app/database/store/database-state/data-tarif.state';
import * as TindakanConf from '../../../database/data-tarif/json/table.config.json'
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { MolDialogComponent } from "../../../components/molecules/mol-dialog/mol-dialog.component";
import { DialogCompsModels } from 'src/app/components/models/dialogCompsModel';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetPatientTeradmisiHariIni } from '../action/patient.action';
import { DialogModule } from 'primeng/dialog';
import { formatCurrency, formatDate, formatNumber } from '@angular/common';
import { AtomButtonComponent } from "../../../components/atom/atom-button/atom-button.component";
import { TransactionRecordsComponent } from "./transaction-records/transaction-records.component";
import { TindakanService } from '../service/tindakan-service/tindakan.service';
import { map, Subject } from 'rxjs';
import { INSERTTARIFTINDAKAN } from '../model/input_tarif_tindakan.mode';
import { DropdownModule } from 'primeng/dropdown';
import { PostRequestByDynamicFiterModel } from 'src/app/shared/model/dynamic-filter.model';
import { SetupPoliService } from 'src/app/database/services/setup-poli/setup-poli.service';
import { EncryptionService } from 'src/app/shared/service/encryption/encryption.service';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-input-tarif-tindakan-pasien',
  standalone: true,
  imports: [LayoutComponent, MolDropdownComponent,
    InputLookupComponent, DropdownModule,
    DialogModule, MolInputFieldsComponent,
    MolTableComponent, MolDialogComponent, FormsModule,
    ReactiveFormsModule, AtomButtonComponent,
    TransactionRecordsComponent,CalendarModule],
  templateUrl: './input-tarif-tindakan-pasien.component.html',
  styleUrl: './input-tarif-tindakan-pasien.component.scss'
})
export class InputTarifTindakanPasienComponent implements OnInit, AfterViewInit, OnDestroy {

  $Destroy = new Subject()

  ConfLookupData = MRCOnfig

  confDataTindakan = TindakanConf

  tindakanvis = false

  @ViewChild('LookupPasien') LookupPasien!: InputLookupComponent
  tableLookupProps: TableProps.Table = {
    columns: [...this.ConfLookupData.columns,
    {
      type: 'button',
      header: 'Action',
      button: [
        {
          buttonIcon: 'pi pi-plus',
          buttonLabel: '',
          buttonClass: 'p-button-sm p-button-rounded p-button-primary p-button-outlined',
          onClick: (rowData: any) => {
            console.log("Cekkk", rowData)
            this.selectedMR = rowData
            setTimeout(() => {
              this.LookupPasien.visible = false
              this.LookupPasien.Value = this.selectedMR.nama_pasien
              this.FormHeaderPemasukan.get('nama_dokter')?.setValue(rowData.nama_dokter)
              this.FormHeaderPemasukan.get('tgl_masuk')?.setValue(rowData.tgl_masuk)
              // this.DropDownAttributesPoli.selectedValue = rowData.
              this.getDataTransactionPasien(this.selectedMR.id_register)
            }, 100)
          }
        },
      ]
    }
    ],
    datasource: [],
    pagination: 10,
    filteredBy: ['full_name', 'no_rekam_medis']
  }


  @ViewChild('GridTindakanMasuk') GridTindakanMasuk!: MolTableComponent

  TableProps: TableProps.Table = {
    columns: [
      {
        field: "kode_setup_tarif", header: "KODE TARIF"
      },
      {
        field: "nama_setup_tarif", header: "NAMA TARIF"
      },
      {
        field: "harga", header: "HARGA", "type": "currency"
      },
      {
        field: "diskon", header: "Disc (%)", "type": "number"
      },
      {
        field: "total", header: "TOTAL", "type": "currency"
      }
    ],
    datasource: [],
    pagination: 5,
    filteredBy: [],
    toolbars: ['Add', 'Delete']
  }

  selectedMR: any

  DropDownAttributesPoli: DropdownAttributeModel = {
    filter: false,
    filterBy: [],
    label: 'poli',
    Optionlabel: 'label',
    placeholder: '',
    selectedValue: '',
    OptionValue: 'value',
    datasource: []
  }
  selectedPoli: any

  dropdownDataSource: any[] = []

  @ViewChild('LookupTindakan') LookupTindakan!: InputLookupComponent
  tableTindakanAttr:TableProps.Table = {
    columns: [...this.confDataTindakan.columns,
    {
      type: 'button',
      header: 'Action',
      button: [
        {
          buttonIcon: 'pi pi-plus',
          buttonLabel: '',
          buttonClass: 'p-button-sm p-button-rounded p-button-primary p-button-outlined',
          onClick: (rowData: any) => {
            // this.selectedRow.emit(rowData)

            this.selectedRowTindakan = rowData


            setTimeout(() => {
              this.onSetValueInputTindakan(this.selectedRowTindakan)
              this.LookupTindakan.visible = false
              this.LookupTindakan.Value = this.selectedRowTindakan.nama_setup_tarif

            }, 200)
          }

        },
      ]
    }
    ],
    datasource: [],
    pagination: 10,
    filteredBy:["nama_setup_tarif"]
  }

  selectedRowTindakan: any

  ButtonNav: ButtonNavModel[] = [
    { icons: 'pi pi-receipt', id: 'history_transaction', styleClass: 'p-button-sm p-button-secondary ', text: '[F1] History Transaksi' },
    { icons: 'pi pi-save', id: 'simpan', styleClass: 'p-button-sm p-button-success ', text: 'Simpan' },
    { icons: 'pi pi-chevron-left', id: 'back', styleClass: 'p-button-sm p-button-danger ', text: 'Back' }
  ]

  @ViewChild('dialogTest') dialogTest!: MolDialogComponent
  DialogAttribute: DialogCompsModels.Attributes = {
    Headers: 'Menu Tarif',
    Style: {
      height: '35rem',
      width: '80rem'
    }
  }

  FormInputPemasukan!: FormGroup

  FormHeaderPemasukan!: FormGroup

  PoliDataSoirce: any[] = []

  NationalitySelect: any

  @ViewChild('transacationRecordsComps') transacationRecordsComps!: TransactionRecordsComponent

  @HostListener('document:keydown', ['$event'])
  keyDownHandler(keydown: KeyboardEvent): void {
    if (keydown.keyCode == 112) {
      keydown.preventDefault()
      this.transacationRecordsComps.handleOpen()
    }
  }

  PoliDDAttr: any = {
    datasource: []
  }

  constructor(private router: Router,
    private store: Store,
    private activatedRouted: ActivatedRoute,
    private utilityService: UtilityService,
    private formBuilder: FormBuilder,
    private tindakanService: TindakanService,
    private setupPoliService: SetupPoliService,
    private activatedRoutes:ActivatedRoute,
    private encryptionService:EncryptionService
  ) {

  }

  ngOnInit(): void {
    this.onGetData()
    this.setAttributeForm()
   
  }


  onGetParams():void{
    let raw_person = this.activatedRoutes.snapshot.params['id']
    raw_person = this.encryptionService.decrypt(raw_person)
    const person = JSON.parse(raw_person)
    console.log(person)

    this.FormHeaderPemasukan.get('nama_pasien')?.setValue(person.nama_pasien)
    this.FormHeaderPemasukan.get('tgl_masuk')?.setValue(new Date(person.tgl_admisi))
    this.FormHeaderPemasukan.get('tgl_transaksi')?.setValue(formatDate(new Date(),'MM/dd/yyyy','EN'))

  }

  getDataTransactionPasien(id_register: number): void {
    this.tindakanService.getDetailHistoryTindakanIrjaByIdRegister(id_register).subscribe(result => {
      try {
        this.transacationRecordsComps.tablePropsTransaction.datasource = result.data
      } catch (error: any) {
        console.error(error)
      }
    })
  }

  setAttributeForm(): void {
    this.FormInputPemasukan = this.formBuilder.group(
      {
        id_setup_tarif: [0, [Validators.required]],
        nama_setup_tarif: [''],
        kode_setup_tarif: [''],
        nama_dokter: [{ value: '', disabled: true }, Validators.required],
        harga: [0, [Validators.required]],
        qty: ['', [Validators.required, Validators.min(1)]],
        diskon: ['', [Validators.min(0), Validators.max(100)]],
        potongan: ['', [Validators.min(0)]],
        total: [0, Validators.required],
      })

    console.log(this)

    this.FormHeaderPemasukan = this.formBuilder.group({
      nama_dokter: [''],
      tgl_masuk: [""],
      id_poli: [1],
      tgl_transaksi: [new Date()],
      nama_pasien:['',[Validators.required]]
    })

  }

  handleChangeQty(args: any): void {
    const count = args.target.value

    if (count != 1) {

      this.total?.setValue(this.harga.value * count)

    } else {

      this.total?.setValue(this.harga.value)

    }

  }

  ngAfterViewInit(): void {

    const data = this.activatedRouted.snapshot.queryParams
    this.onGetParams()
  }

  handleChangePoli(args: any): void {
    console.log(args)
    this.selectedMR.id_poli = args
  }

  onGetData(): void {
    // this.store.dispatch(new GetPatientTeradmisiHariIni([])).subscribe(result => {
    //   this.tableLookupProps.datasource = result.patient.patient_teradmisi
    // })

    // this.store.select(DataPoliState.selectPoliAll).subscribe(result => {
    //   this.DropDownAttributesPoli.datasource = result.poli.data.map((el: any) => ({ label: el.nama_poli, value: el.id_poli }))
    // })

    // this.store.select(DataTarifState.selectAllTarif).subscribe(result => {
    //   this.tabbleAttr.datasource = result.tarif.data
    // })

    let filter: any[] = [{
      columnName: "",
      filter: "",
      searchText: "",
      searchText2: ""
    }]

    this.tindakanService.postGetAllTarifBerlakuPerPoli(filter,1,10).subscribe(result => {
      console.log("Cekk ===== ", result)
      this.tableTindakanAttr = result.data
    })

    this.tindakanService.getAllPasienIrjaForLookupTindakan([]).subscribe(result => {
      this.tableLookupProps.datasource = result.data
    })

    this.setupPoliService.onGetAll()
    .pipe(map((res: { responseResult: string, data: any[] }) => {
      return res.data.map((item) => ({ label: item.nama_poli, value: item.id_poli }))
    })).subscribe(result => {
      this.DropDownAttributesPoli.datasource = result
    })

  }

  handleClickButtonNav(ButtonId: any): void {
    switch (ButtonId) {
      case 'back':
        this.router.navigateByUrl('Patient/list-pasien-dalam-layanan')
        break;
      case 'simpan':
        this.utilityService.onShowingConfirmationAlert('info', 'Perhatian', 'Pastikan data yang anda inputkan sudah sesuai !', () => {
          this.onInsertTransaction()
        }, () => {

        })
        break;
      case 'history_transaction':
        this.transacationRecordsComps.handleOpen()
        break;
      default:
        break;
    }
  }

  onInsertTransaction(): void {

    this.TableProps.datasource.map(el => ({ id_poli: this.FormHeaderPemasukan.get('id_poli')?.value }))

    const payload: INSERTTARIFTINDAKAN.HeaderTrans = {
      id_register: this.selectedMR.id_register,
      item_transaksi: this.TableProps.datasource
    }

    console.log(payload)

    this.tindakanService.inserTarifTindakanIRJA(payload).subscribe(result => {
      console.log(result)
    })
  }

  onSetValueInputTindakan(dataTindakan: any): void {

    console.log(dataTindakan)

    this.id_setup_tarif?.setValue(dataTindakan.id_setup_tarif)

    this.harga.setValue(dataTindakan.nominal_tarif)

    this.qty?.setValue(dataTindakan.qty)

    this.nama_setup_tarif?.setValue(dataTindakan.nama_setup_tarif)

    this.kode_setup_tarif?.setValue(dataTindakan.kode_setup_tarif)


    this.FormInputPemasukan.get('total')?.setValue(dataTindakan.nominal_tarif)

    setTimeout(() => {
      console.log("FORM INPUT PEMASUKAN ==> ", this.FormInputPemasukan.value)
    }, 500)
  }

  handleSelectedRowTindakanMsuk(args: any): void {
    this.selectedRowTindakan =
    {
      index: this.TableProps.datasource.indexOf(args.data),
      data: args.data
    }
  }

  onToolbarClick(args: any): void {
    console.log(args)
    if (args == 'Add') {
      // this.lookupTindkan.showDialog()   
      this.dialogTest.handleOpenModal()
    }

    if (args == 'Delete') {

      this.TableProps.datasource.splice(this.selectedRowTindakan.index, 1)

      this.utilityService.onInfoToast(`Tarif ${this.selectedRowTindakan.data.nama_setup_tarif} dihapus`)

    }
  }


  handleClickSimpanTransaksi(Form: any): void {

    console.log(Form)
    Form.id_poli = 1

    this.dialogTest.handleCloseModal()
    this.utilityService.onSuccessToast(`Tarif ${this.nama_setup_tarif.value} ditambahkan`)

    this.TableProps.datasource.push(Form)

  }

  handleClickBatalTransaksi(): void {

    this.dialogTest.handleCloseModal()

    this.onResetPemasukan()

  }

  onResetPemasukan(): void {

    this.FormInputPemasukan.reset()
    this.LookupTindakan.Value = ''

  }

  handleKeyupEnter(args: any): void {

    const value = args.target.value
    if (value != 0) {
      this.total?.setValue(this.total.value - (this.total.value * value / 100))
    }
    else {
      this.total?.setValue(this.harga.value)
    }

  }

  ngOnDestroy(): void {
    this.$Destroy.complete()
    this.$Destroy.next(0)
  }

  get id_setup_tarif(): AbstractControl | null {
    return this.FormInputPemasukan.get('id_setup_tarif');
  }

  get nama_dokter(): AbstractControl | null {
    return this.FormInputPemasukan.get('nama_dokter');
  }

  get harga(): AbstractControl | any {
    return this.FormInputPemasukan.get('harga');
  }

  get qty(): AbstractControl | any {
    return this.FormInputPemasukan.get('qty');
  }

  get diskon(): AbstractControl | null {
    return this.FormInputPemasukan.get('diskon');
  }

  get potongan(): AbstractControl | null {
    return this.FormInputPemasukan.get('potongan');
  }

  get total(): AbstractControl | null {
    return this.FormInputPemasukan.get('total');
  }

  get nama_setup_tarif(): AbstractControl | any {
    return this.FormInputPemasukan.get('nama_setup_tarif')
  }

  get kode_setup_tarif(): AbstractControl | null {
    return this.FormInputPemasukan.get('kode_setup_tarif')
  }

}
