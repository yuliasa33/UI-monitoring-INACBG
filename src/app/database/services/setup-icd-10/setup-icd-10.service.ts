import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SetupIcd10Service {

  constructor(private httpOperationService:HttpOperationService,
              private utiltyService:UtilityService
  ) { }

  onGetAll(): Observable<any> {
    return this.httpOperationService.onGetRequest(`${environment.Api}admisi/Diagnosa/GetAll`);
}

// onGetById(DiagnosaAwalId: number): Observable<any> {
//     return this.httpOperationService.onGetRequest(this.API_ASAL_RUJUKAN.GET_DIAGNOSA_AWAL_BY_ID, DiagnosaAwalId);
// }

onPostSave(Data: any): Observable<any> {
    return this.httpOperationService.onPostRequest(`${environment.Api}admisi/Diagnosa/Insert`, Data)
        .pipe(
            catchError((error: any): any => {
                this.utiltyService.onFailedToast(error.statusText);
            })
        );
}



}
