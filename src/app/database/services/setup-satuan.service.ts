import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { environment } from 'src/environment/environment';

export interface SetupSatuanInsertRequest {
  nama_satuan: string
  kode_satuan: string
}

export type SetupSatuanUpdateRequest = Partial<SetupSatuanInsertRequest>

@Injectable({
  providedIn: 'root'
})
export class SetupSatuanService {

  constructor(
    private httpOperationService: HttpOperationService,
    private utilityService: UtilityService
  ) {}

  onGetAllByParams(params?: []): Observable<any> {
    return this.httpOperationService
    .onPostRequest(`${environment.Api}pharmm/SetupSatuan/GetAllByParams`, params || [])
    .pipe(catchError((error: any): any => {
      this.utilityService.onFailedToast(error.message)
    }))
  }

  onInsert(req: SetupSatuanInsertRequest): Observable<any> {
    return this.httpOperationService
    .onPostRequest(`${environment.Api}pharmm/SetupSatuan/Insert`, req)
    .pipe(catchError((error: any): any => {
      this.utilityService.onFailedToast(error.message)
    }))
  }


  onUpdate(req: SetupSatuanUpdateRequest): Observable<any> {
    return this.httpOperationService
    .onPutRequest(`${environment.Api}pharmm/SetupSatuan/Update`, req)
    .pipe(catchError((error: any): any => {
      this.utilityService.onFailedToast(error.message)
    }))
  }
}
