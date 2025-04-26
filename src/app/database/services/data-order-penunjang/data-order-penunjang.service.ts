import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { HttpResponseModel } from 'src/app/shared/model/http-response.model';
import { GrupPenunjangModel } from 'src/app/shared/model/database.model';
import { DELETE_SETUP_GRUP_PENUNJANG, GET_ALL_SETUP_GRUP_PENUNJANG, GET_BY_ID_SETUP_GRUP_PENUNJANG, POST_SAVE_SETUP_GRUP_PENUNJANG, PUT_UPDATE_SETUP_GRUP_PENUNJANG } from 'src/app/shared/api/database/order-penunjang-api';

@Injectable({
  providedIn: 'root'
})
export class OrderPenunjangService {
  constructor(
    private httpOperationService: HttpOperationService
  ) { }

  onGetAll(): Observable<HttpResponseModel<GrupPenunjangModel[]>> {
    return this.httpOperationService.onGetRequest(GET_ALL_SETUP_GRUP_PENUNJANG);
  }

  onGetById(id: number): Observable<HttpResponseModel<GrupPenunjangModel>> {
    return this.httpOperationService.onGetRequest(GET_BY_ID_SETUP_GRUP_PENUNJANG + id);
  }

  onPostSave(Data: Partial<GrupPenunjangModel>): Observable<HttpResponseModel> {
    return this.httpOperationService.onPostRequest(POST_SAVE_SETUP_GRUP_PENUNJANG, Data)
  }

  onPutEdit(Data: GrupPenunjangModel): Observable<HttpResponseModel> {
    return this.httpOperationService.onPutRequest(PUT_UPDATE_SETUP_GRUP_PENUNJANG, Data)
  }

  onDelete(id: number): Observable<HttpResponseModel> {
    return this.httpOperationService.onDeleteRequest(DELETE_SETUP_GRUP_PENUNJANG + id)
  }
}
