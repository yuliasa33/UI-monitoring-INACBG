import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { CUTI_DOKTER_GET_ALL, CUTI_DOKTER_GET_ALL_BY_DYNAMIC_FILTER, CUTI_DOKTER_INSERT, CUTI_DOKTER_UPDATE, CUTI_DOKTER_UPDATE_STATUS } from 'src/app/shared/api/dokter/cuti-dokter-api';
import { PostRequestByDynamicFiterModel } from 'src/app/shared/model/dynamic-filter.model';
import { HttpResponseModel } from 'src/app/shared/model/http-response.model';
import { CutiDokterModel, InsertCutiDokterModel, UpdateStatusCutiDokterModel } from 'src/app/shared/model/setup-cuti-dokter';

@Injectable({
  providedIn: 'root'
})
export class SetupCutiDokterService {
  constructor(
    private httpOperationService: HttpOperationService,
  ){ }

  onGetAll(): Observable<HttpResponseModel<CutiDokterModel[]>> {
    return this.httpOperationService.onGetRequest(CUTI_DOKTER_GET_ALL);
  }

  onPostSave(data: InsertCutiDokterModel): Observable<HttpResponseModel> {
    return this.httpOperationService.onPostRequest(CUTI_DOKTER_INSERT, data);
  }

  onPutEdit(data: InsertCutiDokterModel): Observable<HttpResponseModel> {
    return this.httpOperationService.onPutRequest(CUTI_DOKTER_UPDATE, data)
  }

  onPutEditStatus(data: UpdateStatusCutiDokterModel): Observable<HttpResponseModel> {
    return this.httpOperationService.onPutRequest(CUTI_DOKTER_UPDATE_STATUS, data)
  }

  onGetAllByDynamicFilter(data: PostRequestByDynamicFiterModel): Observable<any> {
    return this.httpOperationService.onPostRequest(CUTI_DOKTER_GET_ALL_BY_DYNAMIC_FILTER, data)
  }
}
