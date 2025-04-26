import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { GET_ALL_DEBITUR } from 'src/app/shared/api/patient/patient-api';
import { DELETE_SETUP_DEBITUR, GET_ALL_DEBITUR_FOR_LOOKUP_ADMISI, GET_SETUP_DEBITUR_BY_ID, POST_SAVE_SETUP_DEBITUR, PUT_UPDATE_SETUP_DEBITUR } from 'src/app/shared/api/debitur/debitur-api';
import { HttpResponseModel } from 'src/app/shared/model/http-response.model';
import { DebiturInsert, DebiturModel } from 'src/app/shared/model/setup-debitur.model';
import { DELETE_SETUP_BAHASA, GET_ALL_SETUP_BAHASA, GET_SETUP_BAHASA_BY_ID, POST_SAVE_SETUP_BAHASA, PUT_UPDATE_SETUP_BAHASA } from 'src/app/shared/api/bahasa/bahasa-api';

@Injectable({
  providedIn: 'root'
})
export class BahasaService {
  constructor(
    private httpOperationService: HttpOperationService
  ) { }

  onGetAll(): Observable<HttpResponseModel<DebiturModel[]>> {
    return this.httpOperationService.onGetRequest(GET_ALL_SETUP_BAHASA);
  }

  onGetById(DebiturId: number): Observable<HttpResponseModel<DebiturModel>> {
    return this.httpOperationService.onGetRequest(GET_SETUP_BAHASA_BY_ID + DebiturId);
  }

  onPostSave(Data: DebiturInsert): Observable<HttpResponseModel> {
    return this.httpOperationService.onPostRequest(POST_SAVE_SETUP_BAHASA, Data)
  }

  onPutEdit(Data: DebiturModel): Observable<HttpResponseModel> {
    return this.httpOperationService.onPutRequest(PUT_UPDATE_SETUP_BAHASA, Data)
  }

  onDelete(DebiturId: number): Observable<HttpResponseModel> {
    return this.httpOperationService.onDeleteRequest(DELETE_SETUP_BAHASA + DebiturId)
  }
}
