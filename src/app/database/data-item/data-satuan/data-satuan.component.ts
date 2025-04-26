import { Component, signal } from '@angular/core';
import { LayoutComponent } from "../../../components/layout/layout.component";
import { MolTableComponent } from "../../../components/molecules/mol-table/mol-table.component";
import { ButtonNavModel } from 'src/app/components/models/buttonNavModel';
import * as GridItemJson from './json/griditem.json'
import { TableProps } from 'src/app/components/models/tableProps.model';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FilterComponent } from 'src/app/components/molecules/filter/filter.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MolDropdownComponent } from 'src/app/components/molecules/mol-dropdown/mol-dropdown.component';
import { MolInputFieldsComponent } from 'src/app/components/molecules/mol-input-fields/mol-input-fields.component';
import { SetupitemService } from '../../services/setup-item/setupitem.service';
import { SetupSatuanService } from '../../services/setup-satuan.service';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { AtomToggleComponent } from "../../../components/atom/atom-toggle/atom-toggle.component";

@Component({
  selector: 'app-data-satuan',
  standalone: true,
  imports: [
    CommonModule,
    LayoutComponent,
    MolTableComponent,
    DialogModule,
    LayoutComponent,
    MolTableComponent,
    FilterComponent,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    MolDropdownComponent,
    MolInputFieldsComponent,
    AtomToggleComponent
],
  templateUrl: './data-satuan.component.html',
  styleUrl: './data-satuan.component.scss'
})
export class DataSatuanComponent {
  
  constructor(
    private formBuilder: FormBuilder,
    public setupItemService: SetupitemService,
    private setupSatuanService: SetupSatuanService,
    private utilityService: UtilityService
  ){}

  ngOnInit(): void {
    this.getAllData()
    this.setAttribute()
  }

  selectedRow = signal<any>(null)
  showModal = signal(false)

  columnConf = GridItemJson

  TableProps: TableProps.Table = {
    columns: [...this.columnConf.columns],
    datasource: [],
    pagination: 10,
    toolbars:['Add', 'Edit'],
    filteredBy: ['kode_satuan', 'nama_satuan']
  }

  inputState: "normal" | "edit" = "normal";
  FormItem!: FormGroup
  DropDownCoaAttributes: any;

  handelSelectedRow(args:any):void{
    this.selectedRow.set(args.data)
  }

  handleToolbarClick(args:any):void{
    if(args == 'Add'){
      this.handleOpenModal()
    } else if(args == 'Edit'){
      if(!this.selectedRow()) return this.utilityService.onInfoToast("Silahkan pilih item terlebih dahulu")
      
      this.FormItem.setValue({
        kode_satuan: this.selectedRow().kode_satuan,
        nama_satuan: this.selectedRow().nama_satuan,
      })
      this.inputState = "edit"
      this.handleOpenModal()
    }
  }

  handleOpenModal(){
    this.showModal.set(true)
  }

  setAttribute():void{
    this.FormItem = this.formBuilder.group({
      kode_satuan: [""],
      nama_satuan: [""],
    })
  }

  getAllData(){
    this.setupSatuanService.onGetAllByParams()
    .subscribe(result => {
      this.TableProps.datasource = result.data
    })
  }

  resetForm() {
    this.FormItem.reset()
  }

  handleClose() {
    this.showModal.set(false)
    this.inputState = "normal"
  }

  handleClickSubmit() {
    if(this.inputState === "normal"){
      this.setupSatuanService.onInsert(this.FormItem.value)
      .subscribe(result => {
        console.log("Insert => ", result)
        this.utilityService.onSuccessToast("Data berhasil ditambahkan.")
        this.getAllData()
        this.handleClose()
        this.resetForm()
      })
    } else if(this.inputState === "edit"){
      this.setupSatuanService.onUpdate(this.FormItem.value)
      .subscribe(result => {
        console.log("Update => ", result)
        this.utilityService.onSuccessToast("Data berhasil diubah.")
        this.getAllData()
        this.handleClose()
        this.resetForm()
      })
    }
  }
}
