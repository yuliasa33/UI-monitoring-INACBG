import { Component, effect, signal } from '@angular/core';
import { LayoutComponent } from "../../../components/layout/layout.component";
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { TableProps } from 'src/app/components/models/tableProps.model';
import { WilayahModel } from 'src/app/shared/model/setup-wilayah.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MolTableComponent } from 'src/app/components/molecules/mol-table/mol-table.component';
import { KecamatanService } from '../../services/data-wilayah/kecamatan.service';
import { ProvinsiService } from '../../services/data-wilayah/provinsi.service';
import { KotaService } from '../../services/data-wilayah/kota.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-kecamatan',
  standalone: true,
  imports: [CommonModule, LayoutComponent, MolTableComponent, DialogModule, ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule, DropdownModule],
  templateUrl: './kecamatan.component.html',
  styleUrl: './kecamatan.component.scss'
})
export class KecamatanComponent {
  visible: boolean = false
  inputState: 'Add' | 'Edit' = 'Add'
  FormItem: FormGroup
  selectedRow = signal<WilayahModel | null>(null)

  selected_kota = signal<WilayahModel | undefined>(undefined)
  selected_provinsi = signal<WilayahModel | undefined>(undefined)

  data_kota = signal<WilayahModel[]>([])
  data_provinsi = signal<WilayahModel[]>([])

  constructor(
    private provinsiService: ProvinsiService,
    private kotaService: KotaService,
    private kecamatanService: KecamatanService,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService
  ) {
    this.FormItem = this.formBuilder.group({
      kode_wilayah: ['', [Validators.required]],
      nama_wilayah: ['', [Validators.required]],
    });

    effect(() => {
      const selected = this.selected_provinsi()
      if(selected){
        this.kotaService.onGetAllByKodeProvinsi(selected.kode_wilayah as string).subscribe(res => {
          this.data_kota.set(res.data)
        })
      }
    })

    effect(() => {
      const selected = this.selected_kota()
      if(selected){
        this.kecamatanService.onGetAllByKodeKota(selected.kode_wilayah as string).subscribe(res => {
          this.TableProps.datasource = res.data
        })
      }
    })
  }

  TableProps: TableProps.Table = {
    columns: [
      {
        field: 'kode_wilayah',
        header: 'Kode Wilayah'
      },
      {
        field: 'kode_tipe_wilayah',
        header: 'Tipe Wilayah'
      },
      {
        field: 'nama_wilayah',
        header: 'Nama Wilayah'
      },
    ],
    datasource: [],
    pagination: 10,
    toolbars: ['Add', 'Edit', 'Delete', 'Print'],
    filteredBy: ['nama_wilayah', 'kode_wilayah'],
  }

  handleDoubleClickRow(event: any) {
    console.log(event.data);
  }

  handleSelectRow(event: any) {
    this.selectedRow.set(event.data)
  }

  ngOnInit(): void {
    this.handleGetData()
    this.provinsiService.onGetAll().subscribe(res => {
      this.data_provinsi.set(res.data)
    })
  }

  handleToolbarClick(event: any) {
    this.inputState = event
    switch (event) {
      case 'Add':
        this.visible = true
        this.FormItem.get('kode_wilayah')?.enable()
        break;
      case 'Edit':
        if(this.selectedRow() !== null) {
          this.FormItem.patchValue({
            kode_wilayah: this.selectedRow()?.kode_wilayah,
            nama_wilayah: this.selectedRow()?.nama_wilayah,
          })
          this.visible = true
          this.FormItem.get('kode_wilayah')?.disable()
        }
        break;
      case 'Delete':
        const data = this.selectedRow()
        if (data) {
          this.utilityService.onShowingConfirmationAlert(
            'warning',
            'Konfirmasi Hapus Data', 
            'Apakah Anda yakin ingin menghapus data ini?', 
            () => {
              if(data.kode_wilayah){
                this.kecamatanService.onDelete(data.kode_wilayah).subscribe((res) => {
                  this.handleGetData()
                  this.selectedRow.set(null)
                })
                this.utilityService.onSuccessToast('Data berhasil dihapus')
              }
            },
            () => {}
          )
        }
        break;
      case 'Print':
        console.log('Print');
        break;
      default:
        break;
    }
  }

  handleCancel() {
    this.visible = false
    this.FormItem.reset()
  }

  handleSubmit() {
    if (this.inputState === 'Add') {
      this.kecamatanService.onPostSave(this.FormItem.value).subscribe((res) => {
        this.utilityService.onSuccessToast(res.message)
        this.handleGetData()
        this.visible = false
        this.FormItem.reset()
        this.selectedRow.set(null)
      })
    } else if (this.inputState === 'Edit') {
      this.kecamatanService.onPutEdit(this.FormItem.getRawValue()).subscribe((res) => {
        this.utilityService.onSuccessToast(res.message)
        this.handleGetData()
        this.visible = false
        this.FormItem.reset()
        this.selectedRow.set(null)
      })
    }
  }

  handleGetData(){
    this.kecamatanService.onGetAllByKodeKota('11.30').subscribe((res) => {
      this.TableProps.datasource = res.data
    })
  }
}
