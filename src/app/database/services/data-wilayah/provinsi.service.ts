import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { PROVINSI_DELETE, PROVINSI_GET_ALL, PROVINSI_INSERT, PROVINSI_UPDATE } from 'src/app/shared/api/wilayah/wilayah-api';
import { HttpResponseModel } from 'src/app/shared/model/http-response.model';
import { WilayahModel } from 'src/app/shared/model/setup-wilayah.model';

@Injectable({
  providedIn: 'root'
})
export class ProvinsiService {
  constructor(
    private httpOperationService: HttpOperationService,
  ){ }

  onGetAll(): Observable<HttpResponseModel<WilayahModel[]>> {
    return this.httpOperationService.onGetRequest(PROVINSI_GET_ALL);
  }

  onPostSave(data: WilayahModel): Observable<HttpResponseModel> {
    return this.httpOperationService.onPostRequest(PROVINSI_INSERT, data);
  }

  onPutEdit(data: WilayahModel): Observable<HttpResponseModel> {
    console.log(data)
    return this.httpOperationService.onPutRequest(PROVINSI_UPDATE, data)
  }

  onDelete(id: string): Observable<any> {
    return this.httpOperationService.onDeleteRequest(`${PROVINSI_DELETE}/${id}`)
  }
}
