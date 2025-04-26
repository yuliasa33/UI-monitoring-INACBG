import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SetupTarifService {

  public filter = new BehaviorSubject({})

  constructor(
    private httpOperationService: HttpOperationService,
    private utilityService:UtilityService
  ) { }

  getAllByDynamicFilter(data:any):Observable<any>{
    return this.httpOperationService.onPostRequest(`${environment.Api}billing/tarif/SetupTarif/GetSetupTarifAllBYDynamicFilter`,data)
    .pipe(
      map((data: any) => {
        return data
      }),
      catchError((error:HttpErrorResponse): any => {
        this.utilityService.onFailedToast(error.message)
      }
    ))
  }

  insert(data: any): Observable<any>{
    this.utilityService.showLoading()
    return this.httpOperationService.onPostRequest(`${environment.Api}billing/tarif/SetupTarif/Insert`, data)
    .pipe(
      map((res: any) => {
        this.utilityService.hideLoading()
        if(res){
          this.utilityService.onSuccessToast("Tarif berhasil ditambahkan!!!")
        }
        return res
      })
    )
  }

  update(data: any): Observable<any>{
    this.utilityService.showLoading()
    return this.httpOperationService.onPutRequest(`${environment.Api}billing/tarif/Update`, data)
    .pipe(
      map((data: any) => {
        this.utilityService.hideLoading()
        this.utilityService.onSuccessToast("Tarif berhasil diubah!!!")
        return data
      }),
      catchError((error: HttpErrorResponse): any => {
        this.utilityService.hideLoading()
        this.utilityService.onFailedToast(error.message)
      }
    ))
  }

  // delete()

  setDefaultPencarianFilter():void{
    this.filter.next([])
  }

}
