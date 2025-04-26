import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, firstValueFrom, Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { environment } from 'src/environment/environment';
import * as API from '../../../shared/api/patient/patient-api'
import { IAgama, IJobType, InsertPersonRequest, UpdatePerson } from '../model/person.model';
import { HttpResponseModel } from 'src/app/shared/model/http-response.model';
import { IDebitur } from '../model/debitur.model';
import Swal from 'sweetalert2';
import { PATIENTMODELS } from '../model/patient.model';


@Injectable({
  providedIn: 'root'
})
export class PatientService {
  public dataAgama = new BehaviorSubject<{label: string, value: string}[]>([])
  
  constructor(
    private httpOperationService: HttpOperationService,
    private utilityService: UtilityService
  ) { }

  onGetData(data: any): Observable<any> {
    return this.httpOperationService.onPostRequest(API.GET_ALL_PERSON_PATIENT, data)
      .pipe(catchError((error: any): any => {
        this.utilityService.onFailedToast(error.message)
      }))
  }

  onGetAllPasienRawatJalanTeradmisiHariIni(parameter: any[]): Observable<any> {
    return this.httpOperationService.onPostRequest(API.GET_PASIEN_IRJA_TERADMISI_TODAY, parameter)
      .pipe(
        catchError((error: any): any => {
          this.utilityService.onFailedToast(error.message);
        })
      );
  }

  
  onGetPersonPasienDetailByPersonId(PersonId: number): Observable<any> {
    return this.httpOperationService.onGetRequest(API.GET_PASIEN_BY_ID_PERSON + PersonId)
      .pipe(
        catchError((error: any): any => {
          this.utilityService.onFailedToast(error?.message);
        })
      );
  }

  onGetPasienIRJAForLookupTransaksi():Observable<any>{
    return this.httpOperationService.onGetRequest(API.GET_PASIEN_IRJA_FOR_LOOKUP_ADMISI)
    .pipe(
      catchError((error: any): any => {
        this.utilityService.onFailedToast(error?.message);
      })
    );
  }

  postAdmisiNonPenjamin(Data: any): Observable<any> {
    return this.httpOperationService.onPostRequest(API.INSERT_ADMISI_RAJAL_NON_PENJAMIN, Data)
      .pipe(
        catchError((error: any): any => {
          Swal.close()
          this.utilityService.onFailedToast(error?.message);
        })
      );
  }

  onBatalAdmisi(Data: any): Observable<any> {
    return this.httpOperationService.onPostRequest(API.BATAL_ADMISI, Data)
      .pipe(
        catchError((error: any): any => {
          this.utilityService.onFailedToast(error?.message);
        })
      );
  }

  insertPerson(data: InsertPersonRequest): Observable<any>{
    return this.httpOperationService.onPostRequest(API.INSERT_PERSON, data)
  }

  insertPersonLogic(data:InsertPersonRequest):Promise<any>{
     const result = firstValueFrom(this.insertPerson(data))
     console.log(result)
     return result
  }

  updatePerson(data: UpdatePerson): Observable<HttpResponseModel<any>>{
    return this.httpOperationService.onPutRequest(API.UPDATE_PERSON, data)
  }

  getAllAgama(): Observable<HttpResponseModel<IAgama[]>> {
    return this.httpOperationService.onGetRequest(API.AGAMA_GET_ALL)
  }

  getAllJobType(): Observable<HttpResponseModel<IJobType[]>> {
    return this.httpOperationService.onGetRequest(API.GET_ALL_JOB_TYPE)
  }

  getAllDebitur(): Observable<HttpResponseModel<IDebitur[]>> {
    return this.httpOperationService.onGetRequest(API.GET_ALL_DEBITUR)
  }

  setAllAgama(): void {
    this.httpOperationService.onGetRequest(API.AGAMA_GET_ALL)
    .subscribe((result: HttpResponseModel<IAgama[]>) => {
      console.log("Cek Result Agama => " , result)
      let data = result.data.map(item => ({ label: item.agama, value: item.agama }))
      this.dataAgama.next(data)
    })
  }

  // getAllMember(): {

  // }

  destroyObserverVariable():void{
    this.dataAgama.next([])
    this.dataAgama.complete()
  }

}
