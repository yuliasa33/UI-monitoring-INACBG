import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { AddJadwalDokterModel, JadwalDokterModel, SetupHariModel } from 'src/app/shared/model/setup-jadwal-dokter.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-jadwal-dokter-day',
  standalone: true,
  imports: [
    CommonModule,
    AccordionModule,
    CalendarModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './jadwal-dokter-day.component.html',
  styleUrl: './jadwal-dokter-day.component.scss'
})
export class JadwalDokterDayComponent implements OnInit {
  @Input() JadwalDokter?: JadwalDokterModel
  @Output() saveJadwal = new EventEmitter<AddJadwalDokterModel>()
  @Output() deleteJadwal = new EventEmitter<number>()
  addJadwal = signal<number | undefined>(undefined)
  FormAddJadwalDokter!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
      this.FormAddJadwalDokter = this.formBuilder.group({
        id_poli: [this.JadwalDokter?.id_poli, []],
        id_dokter: [this.JadwalDokter?.id_dokter, []],
        hari: [this.addJadwal, []],
        jam_mulai: ["", []],
        jam_selesai: ["", []],
        kuota: ["", []],
        keterangan: ["", []],
      })
  }

  get jadwalDokterDay(): SetupHariModel[]{
    return this.JadwalDokter?.jadwal ?? []
  }

  handleDeleteJadwalDokter(id: string){

  }

  handleSubmit(){
    const jamMulaiDate = this.FormAddJadwalDokter?.get("jam_mulai")?.value;
    const jamSelesaiDate = this.FormAddJadwalDokter?.get("jam_selesai")?.value;

    const formatToHHMM = (date: Date): string => {
      if (!date) return '';
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    this.FormAddJadwalDokter?.get("id_poli")?.setValue(this.JadwalDokter?.id_poli);
    this.FormAddJadwalDokter?.get("id_dokter")?.setValue(this.JadwalDokter?.id_dokter);
    this.FormAddJadwalDokter?.get("hari")?.setValue(this.addJadwal());

    this.FormAddJadwalDokter?.get("jam_mulai")?.setValue(formatToHHMM(jamMulaiDate));
    this.FormAddJadwalDokter?.get("jam_selesai")?.setValue(formatToHHMM(jamSelesaiDate));

    this.saveJadwal.emit(this.FormAddJadwalDokter.value)

    this.cancelAddJadwal()
  }

  handleDelete(id: number){
    this.deleteJadwal.emit(id)
  }
  
  cancelAddJadwal(){
    this.addJadwal.set(undefined)
    this.FormAddJadwalDokter?.reset()
  }
}
