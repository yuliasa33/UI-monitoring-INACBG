import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { PatientService } from '../service/patient.service';
import { LayoutComponent } from "../../../components/layout/layout.component";
import { MolTableComponent } from "../../../components/molecules/mol-table/mol-table.component";
import { TableProps } from 'src/app/components/models/tableProps.model';
import { ButtonNavModel } from 'src/app/components/models/buttonNavModel';
import { BatalAdmisiComponent } from "../batal-admisi/batal-admisi.component";
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetPatientTeradmisiHariIni } from '../action/patient.action';
import { EncryptionService } from 'src/app/shared/service/encryption/encryption.service';


@Component({
  selector: 'app-list-pasien-pelayanan',
  standalone: true,
  imports: [CommonModule, TreeTableModule, LayoutComponent, MolTableComponent, BatalAdmisiComponent],
  templateUrl: './list-pasien-pelayanan.component.html',
  styleUrls: ['./list-pasien-pelayanan.component.scss']
})
export class ListPasienPelayananComponent implements OnInit, AfterViewInit {


  @ViewChild('BatalAdmisiCOmps') BatalAdmisiCOmps!:BatalAdmisiComponent

  public patients: any[] = [];
  public columns: any[] = [];

  ButtonNav:ButtonNavModel[] = []

  TableProperties: TableProps.Table = {
    columns: [{ field: 'nama_poli', header: 'Poli' },
    { field: 'nama_pasien', header: 'Pasien' },
    { field: 'umur', header: 'Usia' },
    { field: 'tgl_admisi', header: 'Tanggal Masuk',type:'date' },
  ],
    datasource: [],
    pagination: 10,
  }

  selectedRow:any


  constructor(private patientService: PatientService,
              private utilityService:UtilityService,
              private router:Router,
              private store:Store,
              private encryptionService:EncryptionService
            ) { }

  ngOnInit(): void {
    this.getData()
  }

  ngAfterViewInit(): void {
    
  }

  getData(): void {
    // this.patientService.onGetAllPasienRawatJalanTeradmisiHariIni([]).subscribe(result => {
    //   console.log(result.data)
    //   this.TableProperties.datasource = result.data
    // }
    // )

    this.store.dispatch(new GetPatientTeradmisiHariIni([])).subscribe(result=>{
      console.log(result)
      this.TableProperties.datasource = result.patient.patient_teradmisi
    })

  }

  handleClickButtonNav(ButtonId:any):void{
    if(ButtonId == 'batal'){
      this.BatalAdmisiCOmps.handleOpenModal()
    }

    if(ButtonId == 'tindakan'){
      const data = {
        nama_pasien:this.selectedRow.nama_pasien,
        id_register:this.selectedRow.id_register,
        nama_poli:this.selectedRow.nama_poli,
        id_poli:this.selectedRow.id_poli
      }
      const encrypt = this.encryptionService.encrypt(JSON.stringify(this.selectedRow))
      this.router.navigate(['Patient/input-tarif-tindakan/',encrypt])
    }
  }

  convertRowNode(rowNode: any) {
    return console.log(rowNode)
  }

  handleToolbarClick(args:any):void{

  }

  handleSelectedRow(args:any):void{
    this.selectedRow = args.data
    if(!this.selectedRow){
      this.ButtonNav = []
    }
    this.ButtonNav = [
      {icons:'pi pi-ban',id:'batal',styleClass:'p-button-danger p-button-sm ',text:'Batal Admisi'},
      {icons:'pi pi-receipt',id:'tindakan',styleClass:'p-button-primary p-button-sm',text:'Input Tindakan'}
    ]
  }

  handleRecieveData(data:any):void{
    console.log(data)
    const payload = {
      id_register:this.selectedRow.id_register,
      reason_canceled:data.reason_canceled
    }
    this.BatalAdmisiCOmps.handleClickCancelInput()
    this.utilityService.onShowingConfirmationAlert('warning','Perhatian','Apakah Anda yakin akan menghapus pasien di layanan',()=>{
      this.patientService.onBatalAdmisi(payload).subscribe(res=>{
        if(res){
         
          if(res.responseResult){
            Swal.close()
            this.utilityService.onSuccessToast(res.message)
            setTimeout(()=>{
              this.BatalAdmisiCOmps.handleClickCancelInput()
              this.getData()
            },500)
          }else{
            Swal.close()
            this.utilityService.onFailedToast(res.message)
            this.BatalAdmisiCOmps.handleClickCancelInput()
          }
        }
      })
    }
    ,
    ()=>{
      this.BatalAdmisiCOmps.handleOpenModal()
    }
  )
    
  }

  groupBy(array: any[], key: string) {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      return result;
    }, {});
  }
}
