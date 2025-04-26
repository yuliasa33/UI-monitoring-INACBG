import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SetupDokterService {

  constructor(private httpOperationService:HttpOperationService,
              private utilityService:UtilityService
  ) { }

  onGetAllDokter(): Observable<any> {
    return this.httpOperationService.onGetRequest(`${environment.Api}pis/Person/PersonDokterGetAll`)
      .pipe(
        catchError((error: any): any => {
          this.utilityService.onFailedToast(error.message);
        }))
}

  onGetAllDokterForLoookupAdmisi(Data:any,id_poli:any):Observable<any>{
      return this.httpOperationService.onPostRequest(`${environment.Api}` + `admisi/Admisi/DokterGetAllForLookupAdmisi/${id_poli}`,Data)
      .pipe(
        catchError((error: any): any => {
          this.utilityService.onFailedToast(error.message);
        }))
  }


}
