import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { HttpResponseModel } from 'src/app/shared/model/http-response.model';
import { AsalRujukanModel } from 'src/app/shared/model/database.model';
import { GET_ALL_ASAL_RUJUKAN, GET_ASAL_RUJUKAN_BY_ID, POST_SAVE_ASAL_RUJUKAN, PUT_UPDATE_ASAL_RUJUKAN } from 'src/app/shared/api/database/asal-rujukan-api';

@Injectable({
  providedIn: 'root'
})
export class AsalRujukanService {
  constructor(
    private httpOperationService: HttpOperationService
  ) { }

  onGetAll(): Observable<HttpResponseModel<AsalRujukanModel[]>> {
    return this.httpOperationService.onGetRequest(GET_ALL_ASAL_RUJUKAN);
  }

  onGetById(id: number): Observable<HttpResponseModel<AsalRujukanModel>> {
    return this.httpOperationService.onGetRequest(GET_ASAL_RUJUKAN_BY_ID + id);
  }

  onPostSave(Data: Partial<AsalRujukanModel>): Observable<HttpResponseModel> {
    return this.httpOperationService.onPostRequest(POST_SAVE_ASAL_RUJUKAN, Data)
  }

  onPutEdit(Data: AsalRujukanModel): Observable<HttpResponseModel> {
    return this.httpOperationService.onPutRequest(PUT_UPDATE_ASAL_RUJUKAN, Data)
  }

  // onDelete(id: number): Observable<HttpResponseModel> {
  //   return this.httpOperationService.onDeleteRequest(DELETE_ASAL_RUJUKAN + id)
  // }
}
