import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
// import * as FileSaver from 'file-saver';
// import { Product } from '../../domain/product';
// import { ProductService } from '../../service/productservice';
import { Table, TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableProps } from '../../models/tableProps.model';
import { FormsModule } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { AtomToggleComponent } from "../../atom/atom-toggle/atom-toggle.component";
import { ContextMenuModule } from 'primeng/contextmenu';
@Component({
  standalone: true,
  imports: [CommonModule, ButtonModule,
    TableModule, DropdownModule, FormsModule,
    InputTextModule, AtomToggleComponent,ContextMenuModule],
  selector: 'app-mol-table',
  templateUrl: './mol-table.component.html',
  styleUrls: ['./mol-table.component.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
  
})
export class MolTableComponent implements OnInit, AfterViewInit {
  @Input('tableProps') tableProps!: TableProps.Table;

  @Input('contextMenu') contextMenu!:any

  @Output('onDoubleClick') onDoubleClick = new EventEmitter()
  filteredDatasource: any[] = []; // Filtered rows for the table
  searchText: string = ''; // Search text

  @Output('onSelectedRow') onSelectedRow = new EventEmitter()

  @Output('unSelectRow') unSelectRow = new EventEmitter()

  @Output('toolbarClick') toolbarClick = new EventEmitter()
  toolbarLabel: any = ''
  toolbarIcon: any = ''

  @Input() rightHeaderTemplate?: TemplateRef<any>;

  @Input() rowClass?: (row: any) => string;

  @Output('rightClick') rightClick = new EventEmitter()

  @ViewChild('dt1') dt1!: Table;

  selectedRow: any
  constructor() {

  }

  ngOnInit() {

  }

  async ngAfterViewInit(): Promise<void> {
    // this.filteredDatasource = await this.tableProps.datasource;
    if (this.tableProps.datasource instanceof Promise) {
      this.filteredDatasource = await this.tableProps.datasource;
    } else {
      this.filteredDatasource = await this.tableProps.datasource;
    }
  }

  onRowInit($event:any):void{
    console.log($event)
  }

  async onSearchChange(searchText: string): Promise<void> {
    if (!searchText.trim()) {
      this.tableProps.datasource = await [...this.filteredDatasource]
    } else {
      this.searchText = searchText.toLowerCase();
      // Filter the rows based on search text
      this.tableProps.datasource = await this.tableProps.datasource.filter((row:any) =>
        this.tableProps.columns.some((col) => {
          const fieldValue = this.getNestedValue(row, col.field);
          return fieldValue?.toString().toLowerCase().includes(this.searchText);
        })
      );
      console.log(this.tableProps.datasource)
    }

  }

  onButtonClick(args: any, data: any): void {

  }

  handleSelectRow(event: any): void {
    const index = this.tableProps.datasource.indexOf(event.data)
    this.onSelectedRow.emit(event)
  }

  handleUnselectRow(event: any): void {
    this.unSelectRow.emit(event)
  }

  onRowDoubleClick(event: any): void {
    console.log('Row double-clicked:', event.data);
    this.onDoubleClick.emit(event.data)
  }

  onClickToolbar(toolbars: any): void {
    this.toolbarClick.emit(toolbars)
  }

  getNestedValue(obj: any, path: string): any {
    return path?.split(';').reduce((value, key) => (value && value[key] !== undefined ? value[key] : null), obj);
  }

  onRightClick(args:any):void{
    console.log(args)
    this.rightClick.emit(args)
  }
}
