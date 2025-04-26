import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-batal-admisi',
  standalone: true,
  imports: [DialogModule,ButtonModule,ReactiveFormsModule,FormsModule,InputTextareaModule],
  templateUrl: './batal-admisi.component.html',
  styleUrl: './batal-admisi.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class BatalAdmisiComponent implements OnInit{

  @Input('namaPasien') namaPasien:any

  
  visible: any = false

  inputState: 'normal' | 'edit' = 'normal'

  FormBatalAdmisi!:FormGroup

  @Output('sendDataForm') sendDataForm = new EventEmitter()

  constructor(private FormBuilder:FormBuilder){

  }

  ngOnInit(): void {
    this.FormBatalAdmisi = this.FormBuilder.group({
      reason_canceled:["",[Validators.required]]
    })
  }

  resetForm():void{
    this.FormBatalAdmisi.reset()
  }

  handleOpenModal():void{
    this.visible = true
  }

  handelSimpan(FormsValue:any):void{
    this.sendDataForm.emit(FormsValue)
  }

  handleClickCancelInput():void{
    this.visible = false
  }


}
