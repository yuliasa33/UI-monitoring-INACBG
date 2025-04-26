import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from "../../../components/layout/layout.component";
import { MolTableComponent } from "../../../components/molecules/mol-table/mol-table.component";
import { ButtonNavModel } from 'src/app/components/models/buttonNavModel';

@Component({
  selector: 'app-pengguna',
  standalone: true,
  imports: [CommonModule, LayoutComponent, MolTableComponent],
  templateUrl: './pengguna.component.html',
  styleUrls: ['./pengguna.component.scss']
})
export class PenggunaComponent {
  ButtonNav:ButtonNavModel[] = [
    {icons:'pi pi-plus',id:'add',text:'Tambah Pengguna',styleClass:'p-button-success'}
  ]
}
