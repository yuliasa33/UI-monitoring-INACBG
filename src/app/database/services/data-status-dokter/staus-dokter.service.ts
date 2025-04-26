import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { HttpResponseModel } from 'src/app/shared/model/http-response.model';
import { StatusDokterModel } from 'src/app/shared/model/database.model';
import { GET_ALL_SETUP_STATUS_DOKTER, GET_BY_ID_SETUP_STATUS_DOKTER, POST_SAVE_SETUP_STATUS_DOKTER, PUT_UPDATE_SETUP_STATUS_DOKTER, DELETE_SETUP_STATUS_DOKTER } from 'src/app/shared/api/database/status-dokter-api';

@Injectable({
  providedIn: 'root'
})
export class StatusDokterService {
  constructor(
    private httpOperationService: HttpOperationService
  ) { }

  onGetAll(): Observable<HttpResponseModel<StatusDokterModel[]>> {
    return this.httpOperationService.onGetRequest(GET_ALL_SETUP_STATUS_DOKTER);
  }

  onGetById(id: number): Observable<HttpResponseModel<StatusDokterModel>> {
    return this.httpOperationService.onGetRequest(GET_BY_ID_SETUP_STATUS_DOKTER + id);
  }

  onPostSave(Data: Partial<StatusDokterModel>): Observable<HttpResponseModel> {
    return this.httpOperationService.onPostRequest(POST_SAVE_SETUP_STATUS_DOKTER, Data)
  }

  onPutEdit(Data: StatusDokterModel): Observable<HttpResponseModel> {
    return this.httpOperationService.onPutRequest(PUT_UPDATE_SETUP_STATUS_DOKTER, Data)
  }

  onDelete(id: number): Observable<HttpResponseModel> {
    return this.httpOperationService.onDeleteRequest(DELETE_SETUP_STATUS_DOKTER + id)
  }
}
