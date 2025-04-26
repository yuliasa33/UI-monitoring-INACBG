import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { GET_ALL_DEBITUR } from 'src/app/shared/api/patient/patient-api';
import { DELETE_SETUP_DEBITUR, GET_SETUP_DEBITUR_BY_ID, POST_SAVE_SETUP_DEBITUR, PUT_UPDATE_SETUP_DEBITUR } from 'src/app/shared/api/debitur/debitur-api';
import { HttpResponseModel } from 'src/app/shared/model/http-response.model';
import { EducationInsert, EducationModel } from 'src/app/shared/model/education.model';
import { GET_ALL_SETUP_EDUCATION, POST_SAVE_SETUP_EDUCATION, PUT_UPDATE_SETUP_EDUCATION, DELETE_SETUP_EDUCATION, GET_BY_ID_SETUP_EDUCATION } from 'src/app/shared/api/education/education-api';

@Injectable({
  providedIn: 'root'
})
export class SetupEducationService {
  constructor(
    private httpOperationService: HttpOperationService
  ) { }

  onGetAll(): Observable<HttpResponseModel<EducationModel[]>> {
    return this.httpOperationService.onGetRequest(GET_ALL_SETUP_EDUCATION);
  }

  onGetById(id: number): Observable<HttpResponseModel<EducationModel>> {
    return this.httpOperationService.onGetRequest(GET_BY_ID_SETUP_EDUCATION + id);
  }

  onPostSave(Data: EducationInsert): Observable<HttpResponseModel> {
    return this.httpOperationService.onPostRequest(POST_SAVE_SETUP_EDUCATION, Data)
  }

  onPutEdit(Data: EducationModel): Observable<HttpResponseModel> {
    return this.httpOperationService.onPutRequest(PUT_UPDATE_SETUP_EDUCATION, Data)
  }

  onDelete(id: number): Observable<HttpResponseModel> {
    return this.httpOperationService.onDeleteRequest(DELETE_SETUP_EDUCATION + id)
  }
}
