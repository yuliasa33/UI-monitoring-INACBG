import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { AtomButtonComponent } from "../../../components/atom/atom-button/atom-button.component";
import { MolInputFieldsComponent } from "../../../components/molecules/mol-input-fields/mol-input-fields.component";
import { LayoutComponent } from "../../../components/layout/layout.component";
import { ButtonNavModel } from 'src/app/components/models/buttonNavModel';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [CommonModule,
    ButtonModule, InputTextModule,ReactiveFormsModule,FormsModule,ButtonModule],
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  animations:[
   trigger('contentAnimation', [
        transition(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ]),
        transition(':leave', [
          animate('500ms ease-in', style({ opacity: 0, transform: 'translateY(30px)' }))
        ])
      ])
  ]
 
})
export class AuthenticationComponent implements OnInit {
  
  FormLogin!:FormGroup

  passwordVisibility:boolean = true

  ButtonNav:ButtonNavModel[] = [
    {icons:'pi pi-arrow-left',text:'Back',id:'back',styleClass:'p-button-danger'},
    {icons:'pi pi-save',text:'Save',id:'save',styleClass:'p-button-success'},
  ]
    constructor(private utilityService:UtilityService,
                private formBuilder:FormBuilder,
                private authenticationService:AuthServiceService
    ){
      localStorage.removeItem('udahLoginNich')
    }

    ngOnInit(): void {
        this.setAttributeForms()
    }

    setAttributeForms():void{
      this.FormLogin = this.formBuilder.group({
        user_name:["",Validators.required],
        password:["",Validators.required]
      })
    }

    onClick(args:any):void{
      this.utilityService.onFailedToast('test di cobe')
    }



    setVisibility():void{
      this.passwordVisibility = !this.passwordVisibility
    }

    onLogin(Form:any):void{
      console.log(Form)
      this.authenticationService.onLoginService(Form)
    }

}
