import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { LayoutComponent } from 'src/app/components/layout/layout.component';
import { MolTableComponent } from 'src/app/components/molecules/mol-table/mol-table.component';
import { TableProps } from 'src/app/components/models/tableProps.model';
import { SetupEducationService } from '../services/data-education/education.service';
import { EducationModel } from 'src/app/shared/model/education.model';

@Component({
  selector: 'app-data-education',
  standalone: true,
  imports: [LayoutComponent, MolTableComponent, CommonModule, DialogModule, ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './data-education.component.html',
  styleUrl: './data-education.component.scss'
})
export class DataEducationComponent implements OnInit {
  inputState: 'Add' | 'Edit' = 'Add';
  visible: boolean = false;
  FormItem!: FormGroup;

  selectedRow = signal<EducationModel | null>(null);

  constructor(
    private formBuilder: FormBuilder,
    private utilityService: UtilityService,
    private educationService: SetupEducationService
  ){
    this.FormItem = this.formBuilder.group({
      id_education: [0, []],
      education: ['', [Validators.required]],
      deskripsi: ['', [Validators.required]],
    })
  }

  TableProps: TableProps.Table = {
    columns: [
      {
        field: 'education',
        header: 'Education',
      },
      {
        field: 'deskripsi',
        header: 'Deskripsi',
      },
    ],
    datasource: [],
    pagination: 10,
    filteredBy: ['education', 'deskripsi'],
    toolbars:['Add', 'Edit', 'Delete']
  }

  handleSelectedRow(event: any) {
    this.selectedRow.set(event.data);
    this.FormItem.patchValue({
      id_education: event.data.id_education,
      education: event.data.education,
      deskripsi: event.data.deskripsi
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
              this.educationService.onDelete(data.id_education).subscribe((res) => {
                this.educationService.onGetAll().subscribe((res) => {
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
    this.educationService.onGetAll().subscribe((res) => {
      this.TableProps.datasource = res.data
    })
  }

  handleCancel(){
    this.visible = false
    this.FormItem.reset()
  }

  handleSubmit(){
    if (this.inputState === 'Add') {
      this.educationService.onPostSave(this.FormItem.value).subscribe((res) => {
        if (res.responseResult) {
          this.educationService.onGetAll().subscribe((res) => {
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
      this.educationService.onPutEdit({ id_bahasa: this.selectedRow()?.id_education, ...this.FormItem.value}).subscribe((res) => {
        if (res.responseResult) {
          this.educationService.onGetAll().subscribe((res) => {
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
