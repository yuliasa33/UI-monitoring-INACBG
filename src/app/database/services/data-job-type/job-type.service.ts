import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { HttpResponseModel } from 'src/app/shared/model/http-response.model';
import { JobTypeModel } from 'src/app/shared/model/setup-tipe-pekerjaan.model';
import { GET_ALL_SETUP_JOB_TYPE, GET_BY_ID_SETUP_JOB_TYPE, POST_SAVE_SETUP_JOB_TYPE, PUT_UPDATE_SETUP_JOB_TYPE, DELETE_SETUP_JOB_TYPE } from 'src/app/shared/api/job-type/job-type-api';

@Injectable({
  providedIn: 'root'
})
export class JobTypeService {
  constructor(
    private httpOperationService: HttpOperationService
  ) { }

  onGetAll(): Observable<HttpResponseModel<JobTypeModel[]>> {
    return this.httpOperationService.onGetRequest(GET_ALL_SETUP_JOB_TYPE);
  }

  onGetById(id: number): Observable<HttpResponseModel<JobTypeModel>> {
    return this.httpOperationService.onGetRequest(GET_BY_ID_SETUP_JOB_TYPE + id);
  }

  onPostSave(Data: Partial<JobTypeModel>): Observable<HttpResponseModel> {
    return this.httpOperationService.onPostRequest(POST_SAVE_SETUP_JOB_TYPE, Data)
  }

  onPutEdit(Data: JobTypeModel): Observable<HttpResponseModel> {
    return this.httpOperationService.onPutRequest(PUT_UPDATE_SETUP_JOB_TYPE, Data)
  }

  onDelete(id: number): Observable<HttpResponseModel> {
    return this.httpOperationService.onDeleteRequest(DELETE_SETUP_JOB_TYPE + id)
  }
}
