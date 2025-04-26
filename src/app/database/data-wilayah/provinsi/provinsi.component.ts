import { Component, OnInit, signal } from '@angular/core';
import { LayoutComponent } from "../../../components/layout/layout.component";
import { MolTableComponent } from "../../../components/molecules/mol-table/mol-table.component";
import { TableProps } from 'src/app/components/models/tableProps.model';
import { ProvinsiService } from '../../services/data-wilayah/provinsi.service';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { WilayahModel } from 'src/app/shared/model/setup-wilayah.model';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';

@Component({
  selector: 'app-provinsi',
  standalone: true,
  imports: [CommonModule, LayoutComponent, MolTableComponent, DialogModule, ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './provinsi.component.html',
  styleUrl: './provinsi.component.scss'
})
export class ProvinsiComponent implements OnInit {
  visible: boolean = false
  inputState: 'Add' | 'Edit' = 'Add'
  FormItem: FormGroup
  selectedRow = signal<WilayahModel | null>(null)

  constructor(
    private provinsiService: ProvinsiService,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService
  ) {
    this.FormItem = this.formBuilder.group({
      kode_wilayah: ['', [Validators.required]],
      nama_wilayah: ['', [Validators.required]],
    });
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
    this.provinsiService.onGetAll().subscribe((res) => {
      this.TableProps.datasource = res.data
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
                this.provinsiService.onDelete(data.kode_wilayah).subscribe((res) => {
                  this.provinsiService.onGetAll().subscribe((res) => {
                    this.TableProps.datasource = res.data
                  })
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
      this.provinsiService.onPostSave(this.FormItem.value).subscribe((res) => {
        this.utilityService.onSuccessToast(res.message)
        this.provinsiService.onGetAll().subscribe((res) => {
          this.TableProps.datasource = res.data
        })
        this.visible = false
        this.FormItem.reset()
        this.selectedRow.set(null)
      })
    } else if (this.inputState === 'Edit') {
      this.provinsiService.onPutEdit(this.FormItem.getRawValue()).subscribe((res) => {
        this.utilityService.onSuccessToast(res.message)
        this.provinsiService.onGetAll().subscribe((res) => {
          this.TableProps.datasource = res.data
        })
        this.visible = false
        this.FormItem.reset()
        this.selectedRow.set(null)
      })
    }
  }
}
