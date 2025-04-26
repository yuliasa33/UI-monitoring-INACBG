import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { HttpResponseModel } from 'src/app/shared/model/http-response.model';
import { JenisRuanganModel } from 'src/app/shared/model/setup-jenis-ruangan.model';
import { environment } from 'src/environment/environment';

@Injectable({
    providedIn: 'root'
})
export class SetupJenisRuanganService {
  constructor(
    private utilityService: UtilityService,
    private httpOperationService: HttpOperationService
  ) { }

  /**
   * Service Untuk Menampilkan Semua Data Jenis Ruangan
   * @onGetAll Observable<HttpResponseModel<JenisRuanganModel>>
  */
  onGetAll(): Observable<HttpResponseModel<JenisRuanganModel[]>> {
    return this.httpOperationService.onGetRequest(`${environment.Api}billing/tarif/SetupJenisRuangan/GetAll`);
  }

  /**
   * Service Untuk Menampilkan Data Jenis Ruangan
   * @onGetById Observable<HttpResponseModel<JenisRuanganModel>>
  */
  onGetById(id: number): Observable<HttpResponseModel<JenisRuanganModel>> {
    return this.httpOperationService.onGetRequest(`${environment.Api}billing/tarif/SetupJenisRuangan/GetById/${id}`);
  }

  /**
   * Service Untuk Manyimpan data baru
   * @onPostSave Observable<HttpResponseModel<JenisRuanganModel>>
   * @param JenisRuanganModel
  */
  onPostSave(Data: JenisRuanganModel): Observable<HttpResponseModel<JenisRuanganModel>> {
    return this.httpOperationService.onPostRequest(`${environment.Api}billing/tarif/SetupJenisRuangan/Insert`, Data)
  }

  /**
   * Service Untuk Mengedit Data
   * @onPutEdit Observable<HttpResponseModel<JenisRuanganModel>>
   * @param JenisRuanganModel
  */
  onPutEdit(Data: JenisRuanganModel): Observable<any> {
    return this.httpOperationService.onPutRequest(`${environment.Api}billing/tarif/SetupJenisRuangan/Update`, Data)
    .pipe(
      catchError((error: HttpErrorResponse): any => {
        this.utilityService.onFailedToast(error.message);
      }
    ));
  }

  /**
   * Service Untuk Menghapus Data
   * @onDelete Observable<HttpResponseModel<JenisRuanganModel>>
   * @param JenisRuanganId
  */
  onDelete(JenisRuanganId: number): Observable<HttpResponseModel<JenisRuanganModel>> {
    return this.httpOperationService.onDeleteRequest(`${environment.Api}billing/tarif/SetupJenisRuangan/Delete/${JenisRuanganId}`)
  }
}
