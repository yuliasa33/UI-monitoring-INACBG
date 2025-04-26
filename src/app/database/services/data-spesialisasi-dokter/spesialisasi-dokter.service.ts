import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { HttpResponseModel } from 'src/app/shared/model/http-response.model';
import { SpesialisasiDokterModel } from 'src/app/shared/model/database.model';
import { GET_ALL_SETUP_SMF, GET_BY_ID_SETUP_SMF, POST_SAVE_SETUP_SMF, PUT_UPDATE_SETUP_SMF, DELETE_SETUP_SMF } from 'src/app/shared/api/database/smf-api';
import { GET_ALL_SETUP_SPESIALISASI_DOKTER, GET_BY_ID_SETUP_SPESIALISASI_DOKTER, POST_SAVE_SETUP_SPESIALISASI_DOKTER, PUT_UPDATE_SETUP_SPESIALISASI_DOKTER, DELETE_SETUP_SPESIALISASI_DOKTER } from 'src/app/shared/api/database/spesialisasi-dokter-api';

@Injectable({
  providedIn: 'root'
})
export class SpesialisasiDokterService {
  constructor(
    private httpOperationService: HttpOperationService
  ) { }

  onGetAll(): Observable<HttpResponseModel<SpesialisasiDokterModel[]>> {
    return this.httpOperationService.onGetRequest(GET_ALL_SETUP_SPESIALISASI_DOKTER);
  }

  onGetById(id: number): Observable<HttpResponseModel<SpesialisasiDokterModel>> {
    return this.httpOperationService.onGetRequest(GET_BY_ID_SETUP_SPESIALISASI_DOKTER + id);
  }

  onPostSave(Data: Partial<SpesialisasiDokterModel>): Observable<HttpResponseModel> {
    return this.httpOperationService.onPostRequest(POST_SAVE_SETUP_SPESIALISASI_DOKTER, Data)
  }

  onPutEdit(Data: SpesialisasiDokterModel): Observable<HttpResponseModel> {
    return this.httpOperationService.onPutRequest(PUT_UPDATE_SETUP_SPESIALISASI_DOKTER, Data)
  }

  onDelete(id: number): Observable<HttpResponseModel> {
    return this.httpOperationService.onDeleteRequest(DELETE_SETUP_SPESIALISASI_DOKTER + id)
  }
}
