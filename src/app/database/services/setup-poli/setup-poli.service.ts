import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { HttpResponseModel } from 'src/app/shared/model/http-response.model';
import { PoliModel } from 'src/app/shared/model/poli.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SetupPoliService {

  constructor(
    private utilityService: UtilityService,
    private httpOperationService: HttpOperationService
  ) { }

  /**
   * Service Untuk Menampilkan Semua Data Poli
   * @onGetAll Observable<GetAllGrupTarifModel>
  */
  onGetAll(): Observable<any> {
    return this.httpOperationService.onGetRequest(`${environment.Api}billing/tarif/Poli/GetAllRecursive`);
  }

  /**
   * Service Untuk Menampilkan Data Poli
   * @onGetById Observable<GetByIdPoliModel>
  */
  onGetById(PoliId: number): Observable<any> {
    return this.httpOperationService.onGetRequest(`${environment.Api}billing/tarif/Poli/GetAllRecursive/`+PoliId);
  }

  /**
   * Service Untuk Manyimpan data baru
   * @onPostSave Observable<PostInsertPoliModel>
   * @param PoliModel
  */
  onPostSave(Data: any): Observable<any> {
      return this.httpOperationService.onPostRequest(`${environment.Api}billing/tarif/Poli/Insert`, Data)
          .pipe(
              catchError((error: any): any => {
                  this.utilityService.onFailedToast(error.message);
              })
          );
  }

  /**
   * Service Untuk Mengubah data
   * @onPutSave Observable<PutInsertPoliModel>
   * @param PoliModel
  */
  onPutSave(Data: any): Observable<any> {
  return this.httpOperationService.onPutRequest(`${environment.Api}billing/tarif/Poli/Update`, Data)
  .pipe(
    catchError((error: any): any => {
        this.utilityService.onFailedToast(error.message);
    }));
  }

  /**
   * Service Untuk Mengubah data
   * @onDelete Observable<PutInsertPoliModel>
   * @param PoliModel
  */
  onDelete(id: any): Observable<any> {
    return this.httpOperationService.onDeleteRequest(`${environment.Api}billing/tarif/Poli/Delete/${id}`)
    .pipe(
      catchError((error: any): any => {
          this.utilityService.onFailedToast(error.message);
      }));
    }

  onGetByIdJenisRuangan(id: number): Observable<HttpResponseModel<PoliModel[]>>{
    return this.httpOperationService.onGetRequest(`${environment.Api}billing/tarif/Poli/GetByIdJenisRuangan/${id}`)
  }
}
