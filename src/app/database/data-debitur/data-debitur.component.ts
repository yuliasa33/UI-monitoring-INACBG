import { Component, OnInit, signal } from '@angular/core';
import { LayoutComponent } from 'src/app/components/layout/layout.component';
import { MolTableComponent } from "../../components/molecules/mol-table/mol-table.component";
import { TableProps } from 'src/app/components/models/tableProps.model';
import { SetupDebiturService } from '../services/data-debitur/debitur.service';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { DebiturModel } from 'src/app/shared/model/setup-debitur.model';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';

@Component({
  selector: 'app-data-debitur',
  standalone: true,
  imports: [CommonModule, LayoutComponent, MolTableComponent, DialogModule, ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule, InputTextareaModule, CalendarModule],
  templateUrl: './data-debitur.component.html',
  styleUrl: './data-debitur.component.scss'
})
export class DataDebiturComponent implements OnInit{
  inputState: 'Add' | 'Edit' = 'Add';
  visible: boolean = false;
  FormItem!: FormGroup;

  selectedRow = signal<DebiturModel | null>(null);
  
  constructor(
    private debiturService: SetupDebiturService,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService,
  ){}

  TableProps: TableProps.Table = {
    columns: [
      {
        field: 'kode_debitur',
        header: 'Kode Debitur',
      },
      {
        field: 'nama_debitur',
        header: 'Nama Debitur',
      }
    ],
    datasource: [],
    pagination: 10,
    filteredBy: ['kode_debitur', 'nama_debitur'],
    toolbars:['Add', 'Edit', 'Delete']
  }
  
  ngOnInit(): void {
    this.debiturService.onGetAll().subscribe((res) => {
      if (res.responseResult) {
        this.TableProps.datasource = res.data;
      }
    });

    this.FormItem = this.formBuilder.group({
      kode_debitur: ['', [Validators.required]],
      nama_debitur: ['', [Validators.required]],
      alamat_debitur: ['', [Validators.required]],
      telepon: ['', [Validators.required]],
      email: ['', [Validators.required]],
      tgl_expired: ['', [Validators.required]],
    });
  }

  handleSelectedRow(event: any) {
    this.selectedRow.set(event.data);
    this.FormItem.patchValue({
      kode_debitur: event.data.kode_debitur,
      nama_debitur: event.data.nama_debitur,
      alamat_debitur: event.data.alamat_debitur,
      telepon: event.data.telepon,
      email: event.data.email,
      tgl_expired: new Date(event.data.tgl_expired),
    });
  }

  handleToolbarClick(event: any) {
    this.inputState = event;
    switch (event) {
      case 'Add':
        this.visible = true;
        break;
      case 'Edit':
        this.visible = true;
        break;
      case 'Delete':
        const data = this.selectedRow()
        if (data) {
          this.utilityService.onShowingConfirmationAlert(
            'warning',
            'Konfirmasi Hapus Data', 
            'Apakah Anda yakin ingin menghapus data ini?', 
            () => {
              this.debiturService.onDelete(data.id_debitur).subscribe((res) => {
                this.debiturService.onGetAll().subscribe((res) => {
                  this.TableProps.datasource = res.data
                })
                this.selectedRow.set(null)
              })
              this.utilityService.onSuccessToast('Data berhasil dihapus')
            },
            () => {}
          )
        }
        break;
      default:
        break;
    }
  }

  handleCancel(){
    this.visible = false;
    this.FormItem.reset();
  }

  handleSubmit(){
    if (this.inputState === 'Add') {
      this.debiturService.onPostSave(this.FormItem.value).subscribe((res) => {
        if (res.responseResult) {
          this.debiturService.onGetAll().subscribe((res) => {
            if (res.responseResult) {
              this.TableProps.datasource = res.data;
            }
          });
          this.utilityService.onSuccessToast(res.message)
          this.visible = false;
          this.FormItem.reset();
        }
      });
    } else if (this.inputState === 'Edit') {
      this.debiturService.onPutEdit({ id_debitur: this.selectedRow()?.id_debitur, ...this.FormItem.value}).subscribe((res) => {
        if (res.responseResult) {
          this.debiturService.onGetAll().subscribe((res) => {
            if (res.responseResult) {
              this.TableProps.datasource = res.data;
            }
          });
          this.utilityService.onSuccessToast(res.message)
          this.visible = false;
          this.FormItem.reset();
        }
      });
    }
  }
}
