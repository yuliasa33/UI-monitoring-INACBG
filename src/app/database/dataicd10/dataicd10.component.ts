import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from "../../components/layout/layout.component";
import { MolTableComponent } from "../../components/molecules/mol-table/mol-table.component";
import { TableProps } from 'src/app/components/models/tableProps.model';
import { Store } from '@ngxs/store';
import { KewarganegaraanState } from '../store/database-state/data-kewarganegaraan.state';
import { ButtonNavModel } from 'src/app/components/models/buttonNavModel';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { ICD10State } from '../store/database-state/data-icd.state';
import { DynamicFormComponent } from "../../components/dynamic-form/dynamic-form.component";
import { FilterComponent } from "../../components/molecules/filter/filter.component";

@Component({
  selector: 'app-dataicd10',
  standalone: true,
  imports: [CommonModule, ButtonModule, LayoutComponent, MolTableComponent, DialogModule, FormsModule, ReactiveFormsModule, InputTextModule, DropdownModule, DynamicFormComponent, FilterComponent],
  templateUrl: './dataicd10.component.html',
  styleUrls: ['./dataicd10.component.scss']
})
export class Dataicd10Component implements OnInit{

  visible: any = false

  inputState: 'normal' | 'edit' = 'normal'

  TableProps: TableProps.Table = {
    columns: [{
      field: 'kode_icd', header: 'KODE ICD'
    },
    {
      field: 'nama_icd', header: 'NAMA ICD'
    },
    // {
    //   type: 'button',
    //   header: 'Action',
    //   button: [
    //     {
    //       buttonIcon: 'pi pi-pencil',
    //       buttonLabel: '',
    //       buttonClass: 'p-button-sm p-button-warning p-button-outlined',
    //       onClick: (Rowdata: any) => { this.handleEditData(Rowdata) }
    //     },
    //     {
    //       buttonIcon: 'pi pi-trash',
    //       buttonLabel: '',
    //       buttonClass: 'p-button-sm p-button-danger p-button-outlined',
    //       onClick:(Rowdata:any)=>{
    //         this.handleDelete(Rowdata)
    //       }
    //     }
    //   ]
    // }],
  ],
    datasource: [],
    pagination: 10
  }

  ButtonNav: ButtonNavModel[] = [
    { icons: 'pi pi-plus', id: 'Add', styleClass: 'p-button-success p-button-sm', text: 'Add' }
  ]

  FormInputICD!: FormGroup

  constructor(private store:Store,
              private formBuilder:FormBuilder
  ){

  }

  ngOnInit(): void {
      this.InitState()
      this.setAttributeForm()
  }

  setAttributeForm():void{
    this.FormInputICD = this.formBuilder.group({
      id_icd:[0],
      kode_icd:[],
      nama_icd:[]
    })
  }

  InitState():void{
    this.store.select(ICD10State.selectAllIcd10).subscribe(result=>{
      console.log(result.data)
      this.TableProps.datasource = result.data
    })
  }

  handleClickButtonNav(ButtonId:any):void{

  }

  handleEditData(args:any):void{

  }

  handleDelete(args:any):void{

  }

}
