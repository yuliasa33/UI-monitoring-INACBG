import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { HttpResponseModel } from 'src/app/shared/model/http-response.model';
import { SmfModel } from 'src/app/shared/model/database.model';
import { GET_ALL_SETUP_SMF, GET_BY_ID_SETUP_SMF, POST_SAVE_SETUP_SMF, PUT_UPDATE_SETUP_SMF, DELETE_SETUP_SMF } from 'src/app/shared/api/database/smf-api';

@Injectable({
  providedIn: 'root'
})
export class SmfDokterService {
  constructor(
    private httpOperationService: HttpOperationService
  ) { }

  onGetAll(): Observable<HttpResponseModel<SmfModel[]>> {
    return this.httpOperationService.onGetRequest(GET_ALL_SETUP_SMF);
  }

  onGetById(id: number): Observable<HttpResponseModel<SmfModel>> {
    return this.httpOperationService.onGetRequest(GET_BY_ID_SETUP_SMF + id);
  }

  onPostSave(Data: Partial<SmfModel>): Observable<HttpResponseModel> {
    return this.httpOperationService.onPostRequest(POST_SAVE_SETUP_SMF, Data)
  }

  onPutEdit(Data: SmfModel): Observable<HttpResponseModel> {
    return this.httpOperationService.onPutRequest(PUT_UPDATE_SETUP_SMF, Data)
  }

  onDelete(id: number): Observable<HttpResponseModel> {
    return this.httpOperationService.onDeleteRequest(DELETE_SETUP_SMF + id)
  }
}
