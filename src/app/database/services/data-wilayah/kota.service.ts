import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { KOTA_DELETE, KOTA_GET_ALL, KOTA_INSERT, KOTA_UPDATE } from 'src/app/shared/api/wilayah/wilayah-api';
import { HttpResponseModel } from 'src/app/shared/model/http-response.model';
import { WilayahModel } from 'src/app/shared/model/setup-wilayah.model';

@Injectable({
  providedIn: 'root'
})
export class KotaService {
  constructor(
    private httpOperationService: HttpOperationService,
  ){ }

  onGetAllByKodeProvinsi(provinsi_id: string): Observable<HttpResponseModel<WilayahModel[]>> {
    return this.httpOperationService.onGetRequest(`${KOTA_GET_ALL}/${provinsi_id}`);
  }

  onPostSave(data: WilayahModel): Observable<HttpResponseModel> {
    return this.httpOperationService.onPostRequest(KOTA_INSERT, data);
  }

  onPutEdit(data: WilayahModel): Observable<HttpResponseModel> {
    console.log(data)
    return this.httpOperationService.onPutRequest(KOTA_UPDATE, data)
  }

  onDelete(id: string): Observable<any> {
    return this.httpOperationService.onDeleteRequest(`${KOTA_DELETE}/${id}`)
  }
}
