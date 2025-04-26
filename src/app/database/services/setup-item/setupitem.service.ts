import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SetupitemService {

  public dataSatuan = new BehaviorSubject([])

  constructor(private httpOperationService:HttpOperationService,
              private utilityService:UtilityService
  ) { }

  onGetDataSetupItemByParams(data:any):Observable<any>{
    return this.httpOperationService.onPostRequest(`${environment.Api}pharmm/SetupItem/GetAllByParams`,data).pipe(catchError((error:any):any=>{
      this.utilityService.onFailedToast(error.message)
    }))
  }

  onPostSave(Data: any): Observable<any> {
    return this.httpOperationService.onPostRequest(`${environment.Api}pharmm/SetupItem/Insert`, Data)
      .pipe(
        catchError((error: any): any => {
          this.utilityService.onFailedToast(error.message);
        })
      );
  }

  onGetAll(): Observable<any> {
    return this.httpOperationService.onGetRequest(`${environment.Api}pharmm/SetupSatuan/GetAll`);
  }

  setSatuanDataSource():void{
    this.onGetAll().subscribe(result=>{
      let data = result.data.map((el:any)=>({label:el.nama_satuan,value:el.id_satuan}))
      this.dataSatuan.next(data)
    })
  }

  destroyObserverVariable():void{
    this.dataSatuan.next([])
    this.dataSatuan.complete()
  }


}
