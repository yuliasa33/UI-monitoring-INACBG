import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { HttpResponseModel } from 'src/app/shared/model/http-response.model';
import { INSERTTARIFTINDAKAN } from '../../model/input_tarif_tindakan.mode';
import * as API from '../../../../shared/api/patient/patient-api'
import { PostRequestByDynamicFiterModel } from 'src/app/shared/model/dynamic-filter.model';


@Injectable({
  providedIn: 'root'
})
export class TindakanService {

  constructor(private httpOperationService:HttpOperationService) { }

  getDetailHistoryTindakanIrjaByIdRegister(id_register:number):Observable<HttpResponseModel>{
    return this.httpOperationService.onGetRequest(API.GET_RECORD_TRANS_TINDAKAN_IRJA_BY_ID_REGISTER + id_register)
  }

  getAllPasienIrjaForLookupTindakan(data:any[]):Observable<any>{
    return this.httpOperationService.onPostRequest(API.POST_GET_LOOKUP_PASIEN_FOR_TINDAKAN,data)
    .pipe(map((result:any)=>{
      if(result){
        return result
      }else{
        console.error(result)
      }
    }))
  }

  postGetAllTarifBerlakuPerPoli(filter:any,id_poli:number,id_kelas:number):Observable<any>{
    return this.httpOperationService.onPostRequest(API.POST_GET_TARIF_BERLAKU_POLI,{filters:filter,id_poli:id_poli,id_kelas:id_kelas})
  }

  inserTarifTindakanIRJA(data:any):Observable<any>{
    return this.httpOperationService.onPostRequest(API.INSERT_TARIF_TINDAKAN_PASIEN_IRJA,data)
  }

}
