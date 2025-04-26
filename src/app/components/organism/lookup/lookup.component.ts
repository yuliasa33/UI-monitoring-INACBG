import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MolTableComponent } from "../../molecules/mol-table/mol-table.component";
import { TableProps } from '../../models/tableProps.model';
import { Store } from '@ngxs/store';
import { ItemState } from 'src/app/database/store/database-state/data-item.state';
@Component({
  imports: [CommonModule, ButtonModule, DialogModule, MolTableComponent],
  standalone:true,
  selector: 'org-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class LookupComponent implements OnInit {

    public visible:boolean = false

    @Input('LookupAttribute') LookupAttribute:any 

    @Output('seletedRow') selectedRow = new EventEmitter<any>()

    // TableProps: TableProps.Table = {
    //   columns: [
    //     ...this.LookupAttribute.column,
    //   {
    //     type:'button',
    //     header:'Action',
    //     button:[
    //     {buttonIcon:'pi pi-plus',
    //       buttonLabel:'',
    //       buttonClass:'p-button-sm p-button-rounded p-button-primary p-button-outlined',
    //       onClick:(rowData:any)=>{
    //         this.selectedRow.emit(rowData)
    //         setTimeout(()=>{
    //           this.visible = false
    //         },500)
    //       }
    //     },
    //     ]
    //   }
      
    //   ,
    //   ],
    //   datasource: this.LookupAttribute.datasource,
    //   pagination: 10
    // }

    constructor(private store:Store,
                private cdr:ChangeDetectorRef
    ){}

    ngOnInit(): void {
      //  this.store.select(ItemState.selectorGetitem).subscribe(result=>{
      //    this.TableProps.datasource = result.dataItem
      //  })
      this.cdr.detectChanges();
    }

    showDialog() {
      this.visible = true;
  }


}
