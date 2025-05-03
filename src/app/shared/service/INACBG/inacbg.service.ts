import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { INACBG } from '../../model/inacbg.mode';
import { environment } from 'src/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InacbgService {

  constructor(private httpOperationService:HttpOperationService,
              private httpClient:HttpClient,
              private utilityService:UtilityService
  ) { }

  onClaimINACBG(data:INACBG.CLAIMINACBG):Observable<any>{
    return this.httpOperationService.onPostRequest(`${environment.Api}v1/inacbg/claim`,data)
    .pipe(catchError((error:any):any=>{{
      this.utilityService.onFailedToast(error)
    }}))

  }

  getAllPendaftaran():Observable<any>{
    
        let httpParam = new HttpParams();
        const data:any = {
          page: 1,
          count: 1000,
        }
    
        for(const key in data){
          if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
            httpParam = httpParam.set(key, data[key]);
          }
        }
        return this.httpClient.get(`${environment.Api}v1/pendaftaran/getAll`, {params:data}).
          pipe(catchError((error: any): any => {
            this.utilityService.onFailedToast(error)
          }))
      
  }

}
