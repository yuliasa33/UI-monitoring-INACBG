import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { LayoutComponent } from 'src/app/components/layout/layout.component';
import { TableProps } from 'src/app/components/models/tableProps.model';
import { MolTableComponent } from 'src/app/components/molecules/mol-table/mol-table.component';
import { BahasaService } from '../services/data-bahasa/bahasa.service';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BahasaModel } from 'src/app/shared/model/setup-bahasa.model';

@Component({
  selector: 'app-data-bahasa',
  standalone: true,
  imports: [LayoutComponent, MolTableComponent, CommonModule, DialogModule, ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './data-bahasa.component.html',
  styleUrl: './data-bahasa.component.scss'
})
export class DataBahasaComponent implements OnInit {
  inputState: 'Add' | 'Edit' = 'Add';
  visible: boolean = false;
  FormItem!: FormGroup;

  selectedRow = signal<BahasaModel | null>(null);

  constructor(
    private formBuilder: FormBuilder,
    private utilityService: UtilityService,
    private bahasaService: BahasaService
  ){
    this.FormItem = this.formBuilder.group({
      id_bahasa: [0, [Validators.required]],
      bahasa: ['', [Validators.required]]
    })
  }
  
  TableProps: TableProps.Table = {
    columns: [
      {
        field: 'bahasa',
        header: 'Bahasa',
      }
    ],
    datasource: [],
    pagination: 10,
    filteredBy: ['bahasa'],
    toolbars:['Add', 'Edit', 'Delete']
  }

  handleSelectedRow(event: any) {
    this.selectedRow.set(event.data);
    this.FormItem.patchValue({
      id_bahasa: event.data.id_bahasa,
      bahasa: event.data.bahasa,
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
              this.bahasaService.onDelete(data.id_bahasa).subscribe((res) => {
                this.bahasaService.onGetAll().subscribe((res) => {
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

  ngOnInit(): void {
    this.bahasaService.onGetAll().subscribe((res) => {
      this.TableProps.datasource = res.data
    })
  }

  handleCancel(){
    this.visible = false
    this.FormItem.reset()
  }

  handleSubmit(){
    if (this.inputState === 'Add') {
      this.bahasaService.onPostSave(this.FormItem.value).subscribe((res) => {
        if (res.responseResult) {
          this.bahasaService.onGetAll().subscribe((res) => {
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
      this.bahasaService.onPutEdit({ id_bahasa: this.selectedRow()?.id_bahasa, ...this.FormItem.value}).subscribe((res) => {
        if (res.responseResult) {
          this.bahasaService.onGetAll().subscribe((res) => {
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
