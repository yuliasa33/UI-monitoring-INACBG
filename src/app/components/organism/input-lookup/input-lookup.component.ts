import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngxs/store';
import { TableProps } from '../../models/tableProps.model';
import { DialogModule } from 'primeng/dialog';
import { MolTableComponent } from '../../molecules/mol-table/mol-table.component';
import { InputLookUp } from '../../models/inputLookupModel';


@Component({
  selector: 'org-input-lookup',
  standalone: true,
  imports: [CommonModule, MolTableComponent, DialogModule, InputTextModule, ButtonModule],
  templateUrl: './input-lookup.component.html',
  styleUrls: ['./input-lookup.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InputLookupComponent {

  public visible: boolean = false

  @Input('direction') direction: 'row' | 'col' = 'col' 

  @Input('labelLookup') labelLookup: any = ''

  @Input('Value') Value: any = ''

  @Input('LookupHeaders') LookupHeaders: any = ''

  @Input('LookupTable') LookupData: any
  
  @Output('doubleClickRow') doubleClickRow = new EventEmitter<any>()

  // @Input('TableLookupProps')TableLookupProps: TableProps.Table = {
  //   columns: [ 
  //     //  {
  //     //    type:'button',
  //     //    header:'TEST',
  //     //    button:[
  //     //    {buttonIcon:'pi pi-plus',
  //     //      buttonLabel:'',
  //     //      buttonClass:'p-button-sm p-button-rounded p-button-primary p-button-outlined',
  //     //      onClick:(rowData:any)=>{
  //     //       //  this.selectedRow.emit(rowData)
  //     //        setTimeout(()=>{
  //     //          this.visible = false
  //     //        },500)
  //     //      }
  //     //    },
  //     //    ]
  //     //  },
  //   ],
  //   datasource: [],
  //   pagination: 10
  // }

  constructor(private store: Store,
              private cdr:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // this.store.select(ItemState.selectorGetitem).subscribe(result=>{
    //   this.TableProps.datasource = result.dataItem
    // })
    this.cdr.detectChanges()
  }



  showDialog() {
    this.visible = true;
  }

  onRowDoubleClick(args: any): void {
    this.doubleClickRow.emit(args)
  }

  handleClickOpenModal(): void {
    this.showDialog()
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['LookupAttribute']) {
  //     this.updateTableProps();
  //   }
  // }

  //   private updateTableProps(): void {
  //     this.TableLookupProps = {
  //       ...this.TableLookupProps,
  //       columns: [
  //         ...this.LookupAttribute.column, // Add dynamic columns
  //         {
  //           type: 'button', // Add static button column
  //           header: 'Action',
  //           button: [
  //             {
  //               buttonIcon: 'pi pi-plus',
  //               buttonLabel: '',
  //               buttonClass: 'p-button-sm p-button-rounded p-button-primary p-button-outlined',
  //               onClick: (rowData: any) => {
  //                 this.emitSelectedRow(rowData);
  //               },
  //             },
  //           ],
  //         },
  //       ],
  //       datasource: this.LookupAttribute.datasource, // Use the updated datasource
  //     };



  // }

  // emitSelectedRow(args:any):void{
  //   this.selectedRow.emit(args)     
  // }
}
