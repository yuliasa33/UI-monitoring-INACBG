import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SetupIcd10Service {

  constructor(private httpOperationService: HttpOperationService,
    private httpClient: HttpClient,
    private utilityService: UtilityService
  ) { }

  getDataICD10Service(data?:any): Observable<any> {
    data = {
      page: 1,
      count: 100,
      kode_icd_10:'',
      nama_icd_10:''
    }

    let httpParam = new HttpParams();

    for(const key in data){
      if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
        httpParam = httpParam.set(key, data[key]);
      }
    }
    return this.httpClient.get(`${environment.Api}v1/icd/getIcd_10`, {params:data}).
      pipe(catchError((error: any): any => {
        this.utilityService.onFailedToast(error)
      }))
  }


  getDataICD9Service(data?:any): Observable<any> {
    data = {
      page: 1,
      count: 100,
      kode_icd_10:'',
      nama_icd_10:''
    }

    let httpParam = new HttpParams();

    for(const key in data){
      if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
        httpParam = httpParam.set(key, data[key]);
      }
    }
    return this.httpClient.get(`${environment.Api}v1/icd/getIcd_9`, {params:data}).
      pipe(catchError((error: any): any => {
        this.utilityService.onFailedToast(error)
      }))
  }

}
