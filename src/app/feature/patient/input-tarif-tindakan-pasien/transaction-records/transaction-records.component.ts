import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { DialogCompsModels } from 'src/app/components/models/dialogCompsModel';
import { MolDialogComponent } from 'src/app/components/molecules/mol-dialog/mol-dialog.component';
import { MolTableComponent } from "../../../../components/molecules/mol-table/mol-table.component";
import { TableProps } from 'src/app/components/models/tableProps.model';

@Component({
  selector: 'app-transaction-records',
  standalone: true,
  imports: [MolDialogComponent, MolTableComponent],
  templateUrl: './transaction-records.component.html',
  styleUrl: './transaction-records.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TransactionRecordsComponent {

  @ViewChild('dialogTest') dialogTest!: MolDialogComponent
  DialogAttribute: DialogCompsModels.Attributes = {
    Headers: 'Transaction Records',
    Style: { height: '40vh', width: '100vw' },
    position: 'bottom'
  }



  @ViewChild('TableTransactionRecords') TableTransactionRecords!: MolTableComponent
  public tablePropsTransaction: TableProps.Table = {
    columns: [
      {
        header: "Tarif", field: 'nama_setup_tarif'
      },
      {
        header: "Harga", field: 'nama_setup_tarif'
      },
      {
        header: "Kode Tarif", field: 'nama_setup_tarif'
      },
      {
        header: "User Input", field: 'nama_setup_tarif'
      }
    ],
    datasource: [],
    pagination: 10,
    filteredBy: [],
    toolbars: []
  }


  handleClose(): void {
    this.dialogTest.handleCloseModal()
  }

  handleOpen(): void {
    this.dialogTest.handleOpenModal()
  }

}
