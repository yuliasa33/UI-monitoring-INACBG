import { Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { GETALLDOKTERACTION } from 'src/app/database/store/database-action/data-dokter.action';
import { GETALLICD10 } from 'src/app/database/store/database-action/data-icd.action';
import { GetAllItem } from 'src/app/database/store/database-action/data-item.action';
import { GetKewarganegaraan } from 'src/app/database/store/database-action/data-kewarganegaraan.action';
import { GETALLPOLI } from 'src/app/database/store/database-action/data-poli.action';
import { GetAllTarif } from 'src/app/database/store/database-action/data-tarif.action';
import { GetPatient } from 'src/app/feature/patient/action/patient.action';
import { environment } from 'src/environment/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  loginUser = {
    username:'yuli',
    password:'1234'
  }

  GetUserData$:any 

  @ViewChild('appComps') appComps!:AppComponent

  constructor(private utilityService:UtilityService,
              private router:Router,
              private httpOperationService:HttpOperationService,
              private store:Store
  ) { }

  onLoginService(data:any):void{
    this.utilityService.onShowLoadingBeforeSend()
    data.app_tipe = 'w',
    data.kode_rs = 'K-001-S'
    this.loginRequest(data).subscribe(result=>{
      Swal.close()
      console.log("RESULT FROM LOGIN SERVICE",result)
      if(result.responseResult == true){
        this.utilityService.onSuccessToast(result.message)
        this.router.navigateByUrl('Dashboard')
        
        this.setUserDataLogin(result.data)
      }else if(result.responseResult == false){
     
        this.utilityService.onFailedToast(result.message)
      }
    })
  }

  initState():void{
      this.store.dispatch(new GetPatient())
      this.store.dispatch(new GetAllItem())
      // this.store.dispatch(new GetKewarganegaraan())
      this.store.dispatch(new GETALLICD10())
      this.store.dispatch(new GETALLDOKTERACTION())
      this.store.dispatch(new GETALLPOLI())
      this.store.dispatch(new GetAllTarif())
    }



  loginRequest(data:any):Observable<any>{
    return this.httpOperationService.onPostRequest(`${environment.Api}pis/Authentication/LoginTenant`,data).pipe(catchError((error:any):any=>{
      console.log(error)
      this.utilityService.onFailedToast(error.message)
    }))
  }


  setUserDataLogin(data:any):void{
    localStorage.setItem('udahLoginNich',JSON.stringify(data))
     this.initState()
  }


}
