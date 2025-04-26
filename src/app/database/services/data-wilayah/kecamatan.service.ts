import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { KECAMATAN_DELETE, KECAMATAN_GET_ALL, KECAMATAN_INSERT, KECAMATAN_UPDATE, KOTA_DELETE, KOTA_GET_ALL, KOTA_INSERT, KOTA_UPDATE } from 'src/app/shared/api/wilayah/wilayah-api';
import { HttpResponseModel } from 'src/app/shared/model/http-response.model';
import { WilayahModel } from 'src/app/shared/model/setup-wilayah.model';

@Injectable({
  providedIn: 'root'
})
export class KecamatanService {
  constructor(
    private httpOperationService: HttpOperationService,
  ){ }

  onGetAllByKodeKota(kota_id: string): Observable<HttpResponseModel<WilayahModel[]>> {
    return this.httpOperationService.onGetRequest(`${KECAMATAN_GET_ALL}/${kota_id}`);
  }

  onPostSave(data: WilayahModel): Observable<HttpResponseModel> {
    return this.httpOperationService.onPostRequest(KECAMATAN_INSERT, data);
  }

  onPutEdit(data: WilayahModel): Observable<HttpResponseModel> {
    console.log(data)
    return this.httpOperationService.onPutRequest(KECAMATAN_UPDATE, data)
  }

  onDelete(id: string): Observable<any> {
    return this.httpOperationService.onDeleteRequest(`${KECAMATAN_DELETE}/${id}`)
  }
}
