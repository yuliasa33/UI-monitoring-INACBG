import { Component, effect, OnInit, signal } from '@angular/core';
import { LayoutComponent } from "../../../components/layout/layout.component";
import { CommonModule } from '@angular/common';
import { AtomCardComponent } from "../../../components/atom/atom-card/atom-card.component";
import { DropdownModule } from 'primeng/dropdown';
import { SetupJenisRuanganService } from '../../services/setup-jenis-ruangan/setup-jenis-ruangan.service';
import { JenisRuanganModel } from 'src/app/shared/model/setup-jenis-ruangan.model';
import { FormsModule } from '@angular/forms';
import { PoliModel } from 'src/app/shared/model/poli.model';
import { SetupPoliService } from '../../services/setup-poli/setup-poli.service';
import { SetupJadwalDokterService } from '../../services/setup-jadwal-dokter/setup-jadwal-dokter.service';
import { AddJadwalDokterModel, DokterModel, JadwalDokterModel } from 'src/app/shared/model/setup-jadwal-dokter.model';
import { TableProps } from 'src/app/components/models/tableProps.model';
import { MolTableComponent } from "../../../components/molecules/mol-table/mol-table.component";
import { JadwalDokterDayComponent } from 'src/app/components/organism/jadwal-dokter-day/jadwal-dokter-day.component';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';

@Component({
  selector: 'app-jadwal-dokter',
  standalone: true,
  imports: [
    CommonModule,
    LayoutComponent,
    AtomCardComponent,
    DropdownModule,
    FormsModule,
    MolTableComponent,
    JadwalDokterDayComponent
],
  templateUrl: './jadwal-dokter.component.html',
  styleUrl: './jadwal-dokter.component.scss'
})
export class JadwalDokterComponent implements OnInit {
  jenis_ruangan_data = signal<JenisRuanganModel[]>([])
  poli_data = signal<PoliModel[]>([])
  dokter_data = signal<DokterModel[]>([])
  jadwal_dokter_data = signal<JadwalDokterModel | undefined>(undefined)

  selected_jenis_ruangan = signal<JenisRuanganModel | undefined>(undefined)
  selected_poli = signal<PoliModel | undefined>(undefined)
  selected_dokter = signal<DokterModel | undefined>(undefined)

  constructor(
    private jenisRuanganService: SetupJenisRuanganService,
    private poliService: SetupPoliService,
    private jadwalDokterService: SetupJadwalDokterService,
    private utilityService: UtilityService
  ){
    effect(() => {
      const selected = this.selected_jenis_ruangan()
      if(selected){
        this.poliService.onGetByIdJenisRuangan(selected?.id_jenis_ruangan as number)
        .subscribe(res => this.poli_data.set(res.data))
      }
    })

    effect(() => {
      const selected = this.selected_poli()
      if(selected){
        this.jadwalDokterService.onGetAllDokterByPoliId(selected.id_poli)
        .subscribe(res => {
          this.TableProps.datasource = res.data
        })
      }
    })

    effect(() => {
      const selected_dokter = this.selected_dokter()
      const selected_poli = this.selected_poli()
      if(selected_dokter && selected_poli){
        this.jadwalDokterService.onPostGetAllJadwalDokterByIdDokterAndIdPoli(
          selected_dokter.id_dokter, 
          selected_poli.id_poli
        )
        .subscribe(res => this.jadwal_dokter_data.set(res.data))
      }
    })
  }

  ngOnInit(): void {
    this.jenisRuanganService.onGetAll().subscribe(res => this.jenis_ruangan_data.set(res.data))
  }

  TableProps: TableProps.Table = {
    columns: [
      {
        field: 'kode_dokter', 
        header: 'KODE DOKTER'
      },
      {
        field: 'full_name', 
        header: 'NAMA DOKTER'
      },
      {
        field: 'spesialisasi_dokter',
        header: 'Spesialis'
      }
    ],
    datasource: [],
    pagination: 10,
    filteredBy:['full_name','kode_dokter'],
  }

  onSelectPoli(poli: PoliModel){
    this.selected_poli.set(poli)
    this.selected_dokter.set(undefined)
    this.jadwal_dokter_data.set(undefined)
  }

  handleSaveJadwalDokter(data: AddJadwalDokterModel){
    this.jadwalDokterService.onPostSaveJadwalDokter(data)
    .subscribe(res => {
      this.utilityService.onSuccessToast(res.message)
      this.jadwalDokterService.onPostGetAllJadwalDokterByIdDokterAndIdPoli(
        this.selected_dokter()?.id_dokter as number, 
        this.selected_poli()?.id_poli as number
      )
      .subscribe(res => this.jadwal_dokter_data.set(res.data))
    })
  }

  handleDeleteJadwal(id: number){
    this.utilityService.onShowingConfirmationAlert(
      'warning',
      'Peringatan',
      `Apa anda yakin ingin menghapus jadwal dokter ?`,
      () => {
        this.jadwalDokterService.onDeleteJadwalDokter(id)
        .subscribe(res => {
          this.utilityService.onSuccessToast(res.message)
          this.jadwalDokterService.onPostGetAllJadwalDokterByIdDokterAndIdPoli(
            this.selected_dokter()?.id_dokter as number, 
            this.selected_poli()?.id_poli as number
          )
          .subscribe(res => this.jadwal_dokter_data.set(res.data))
        })
      },
      () => {}
    )
  }
}
