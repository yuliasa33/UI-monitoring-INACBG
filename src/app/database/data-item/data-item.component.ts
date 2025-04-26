import { Component, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from "../../components/layout/layout.component";
import { MolTableComponent } from "../../components/molecules/mol-table/mol-table.component";
import { TableProps } from 'src/app/components/models/tableProps.model';
import { Store } from '@ngxs/store';
import { ItemState } from '../store/database-state/data-item.state';
import { AddItem, GetAllItem } from '../store/database-action/data-item.action';
import { FilterComponent } from "../../components/molecules/filter/filter.component";
import { ButtonNavModel } from 'src/app/components/models/buttonNavModel';
import { LookupComponent } from "../../components/organism/lookup/lookup.component";
import * as GridItemJson from './json/griditem.json'
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DropdownAttributeModel, MolDropdownComponent } from "../../components/molecules/mol-dropdown/mol-dropdown.component";
import { SetupitemService } from '../services/setup-item/setupitem.service';
import { MolInputFieldsComponent } from "../../components/molecules/mol-input-fields/mol-input-fields.component";
import { SetupSatuanService } from '../services/setup-satuan.service';
import { map } from 'rxjs';


@Component({
  selector: 'app-data-item',
  standalone: true,
  imports: [
    CommonModule, 
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
    MolInputFieldsComponent
  ],
  templateUrl: './data-item.component.html',
  styleUrls: ['./data-item.component.scss']
})
export class DataItemComponent implements OnInit,OnDestroy {

  DropdownSatuanAttributes: DropdownAttributeModel = {
    filter: true,
    label: 'SATUAN',
    Optionlabel: 'label',
    placeholder: 'Pilih satuan',
    selectedValue:{},
    filterBy: 'label',
    OptionValue:'value',
    datasource: []
  }


  FormItem!:FormGroup

  inputState:'normal'|'edit' = 'normal'

  visible = false
  
  columnConf = GridItemJson
  
  TableProps: TableProps.Table = {
    columns: [...this.columnConf.columns],
    datasource: [],
    pagination: 10,
    toolbars:['Add']
  }

  ButtonNav:ButtonNavModel[] = [
    // {icons:'pi pi-plus',id:'add',styleClass:'p-button-success p-button-sm',text:'Add Item'},
  ]

  selectedRow:any = signal({})

  @ViewChild('lookupItem') lookupItem!:LookupComponent
  LookupAttribute:any = {
    HeaderText:"Data Item",
    column:[{field:'nama_item',header:'item'}],
    datasource:[],
  }
  

  constructor(
    private Store: Store,
    private formBuilder:FormBuilder,
    public setupItemService:SetupitemService,
    public setupSatuanService: SetupSatuanService
  ) {}

  handelSelectedRow(args:any):void{
    this.selectedRow.set(args.data)
    console.log("selectedRow",this.selectedRow)
  }

  ngOnInit(): void {
    this.GetData()
    this.setupItemService.setSatuanDataSource()
    this.setAttribute()
  }

  setAttribute():void{
    this.FormItem = this.formBuilder.group({
      kode_item:[""],
      nama_item:[""],
      satuan:['']
    })
  }

  handleToolbarClick(args:any):void{
    console.log(args)
    if(args == 'Add'){
      this.handelOpenModal()
    }
  }

  handelOpenModal():void{
    this.visible = true
  }

  handelClickLookup():void{
    this.lookupItem.visible = true
  }

  GetData(): void {
    this.Store.select(ItemState.selectorGetitem).subscribe(result => {
      this.TableProps.datasource = result.dataItem
      this.LookupAttribute.datasource = result.dataItem
    })
    this.setupItemService.onGetAll()
    .pipe(map((response: any) => {
      return response.data.map((item: any) => ({
        value: item.kode_satuan,
        label: item.nama_satuan
      }))
    }))
    .subscribe(result => {
      this.DropdownSatuanAttributes.datasource = result
    })
  }

  handleSelectedData(args:any):void{
    console.log(args)
  }

  handleClickCancelInput():void{
    this.visible = false
    this.DropdownSatuanAttributes.selectedValue = undefined
    this.FormItem.reset()
  }

  handleClickSubmit(): void{ 
    if(this.inputState === "normal"){
      console.log("Cek Form Value => ", this.FormItem.value)
    }
    // this.Store.dispatch(new AddItem(Forms))
  }

  resetForm():void{

  }

  ngOnDestroy(): void {
    this.setupItemService.destroyObserverVariable()
  }

}
