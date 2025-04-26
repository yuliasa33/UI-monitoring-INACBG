import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SetupWargaNegaraService {
  constructor(
    private utilityService: UtilityService,
    private httpOperationService: HttpOperationService) { }

/**
 * Service Untuk Menampilkan Semua data
 * @onGetAll Observable<PostSaveKebangsaanModel>
*/
onGetAll(): Observable<any> {
    return this.httpOperationService.onGetRequest(`${environment.Api}pis/Kebangsaan/KebangsaanGetAll`)
    .pipe(catchError((error:any):any=>{
      this.utilityService.onFailedToast(error.message)
    }));
}

/**
 * Service Untuk Manyimpan data baru
 * @onPostSave Observable<PostSaveKebangsaanModel>
 * @param KebangsaanModel
*/
 onPostSave(Data: any): Observable<any> {
     return this.httpOperationService.onPostRequest(`${environment.Api}pis/Kebangsaan/KebangsaanInsert`,Data)
         .pipe(
             catchError((error: any): any => {
                 this.utilityService.onFailedToast(error.message);
             })
         );
 }

/**
 * Service Untuk Mengubah data
 * @onPutEdit Observable<PutUpdateKebangsaanModel>
 * @param KebangsaanModel
*/
onPutEdit(Data: any): Observable<any> {
    return this.httpOperationService.onPutRequest(`${environment.Api}pis/Kebangsaan/kebangsaanUpdate`, Data)
    .pipe(
        catchError((error: any): any => {
            this.utilityService.onFailedToast(error.message);
        })
    );
}

/**
 * Service Untuk Manyimpan data baru
 * @onDelete Observable<DeleteKebangsaanModel>
 * @param EducationId
*/
 onDelete(KebangsaanId: number): Observable<any> {
     return this.httpOperationService.onDeleteRequest(environment.Api+'pis/Kebangsaan/KebangsaanDelete/'+ KebangsaanId)
         .pipe(
             catchError((error: any): any => {
                 this.utilityService.onFailedToast(error.message);
             })
         );
 }
}
