import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DialogCompsModels } from '../../models/dialogCompsModel';
@Component({
  selector: 'app-mol-dialog',
  standalone: true,
  imports: [CommonModule,DialogModule],
  templateUrl: './mol-dialog.component.html',
  styleUrls: ['./mol-dialog.component.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MolDialogComponent {
  @Input('DialogAttributes') DialogAttributes!:DialogCompsModels.Attributes

  visibility:boolean = false

  handleCloseModal():void{
    this.visibility = false
  }

  handleOpenModal():void{
    this.visibility = true
  }

}
