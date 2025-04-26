import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { HttpResponseModel } from 'src/app/shared/model/http-response.model';
import { EtnisModel } from 'src/app/shared/model/database.model';
import { DELETE_SETUP_ETNIS, GET_ALL_SETUP_ETNIS, GET_BY_ID_SETUP_ETNIS, POST_SAVE_SETUP_ETNIS, PUT_UPDATE_SETUP_ETNIS } from 'src/app/shared/api/database/etnis-api';

@Injectable({
  providedIn: 'root'
})
export class EtnisService {
  constructor(
    private httpOperationService: HttpOperationService
  ) { }

  onGetAll(): Observable<HttpResponseModel<EtnisModel[]>> {
    return this.httpOperationService.onGetRequest(GET_ALL_SETUP_ETNIS);
  }

  onGetById(id: number): Observable<HttpResponseModel<EtnisModel>> {
    return this.httpOperationService.onGetRequest(GET_BY_ID_SETUP_ETNIS + id);
  }

  onPostSave(Data: Partial<EtnisModel>): Observable<HttpResponseModel> {
    return this.httpOperationService.onPostRequest(POST_SAVE_SETUP_ETNIS, Data)
  }

  onPutEdit(Data: EtnisModel): Observable<HttpResponseModel> {
    return this.httpOperationService.onPutRequest(PUT_UPDATE_SETUP_ETNIS, Data)
  }

  onDelete(id: number): Observable<HttpResponseModel> {
    return this.httpOperationService.onDeleteRequest(DELETE_SETUP_ETNIS + id)
  }
}
