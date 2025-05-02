import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UtilityService } from '../utility/utility.service';
import Swal from 'sweetalert2';
import { HttpResponseModel } from 'src/app/shared/model/http-response.model';

@Injectable({
  providedIn: 'root'
})
export class HttpOperationService {

  constructor(
    private httpClient: HttpClient,
    private utilityService: UtilityService
  ) { }

  conditionError = new BehaviorSubject(false)

  onGetRequest(url: any): Observable<HttpResponseModel> {
    return this.httpClient.get<any>(url)
      .pipe(map((result: any) => {
        if (result.responseResult) {
          return result
        } else {
          return this.handlingError(result)
        }
      }))
  }

  onGetRequestWithParams(url:any,data:any):Observable<HttpResponseModel>{
    
    let httpParam = new HttpParams()
    .set('page',1)
    .set('count',100)
    return this.httpClient.get<any>(url,{params:httpParam})
    .pipe(map((result: any) => {
      if (result.responseResult) {
        return result
      } else {
        return this.handlingError(result)
      }
    }))
  }

  onPostRequest(url: any, data: any): Observable<HttpResponseModel<any>> {

    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })

    return this.httpClient.post<any>(url, data, { headers: header })
      .pipe(map((result: any) => {
        if (result.responseResult) {
          return result
        } else {
          return this.handlingError(result)
        }
      }))
  }

  onPutRequest(url: string, data: any): Observable<HttpResponseModel> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })

    return this.httpClient.put<any>(
      url,
      data,
      { headers: header }
    ).pipe(map((result: any) => {
      if (result.responseResult) {
        return result
      } else {
        return this.handlingError(result)
      }
    }))
  }

  onDeleteRequest(url: any): Observable<HttpResponseModel> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
    return this.httpClient.delete<any>(url, { headers: header })
      .pipe(map((result: any) => {
        if (result.responseResult) {
          return result
        } else {
          return this.handlingError(result)
        }
      }))
  }


  handlingError(errors: any): void {
    console.log(errors)
    // Swal.close()
    this.conditionError.next(true)
    
    this.utilityService.onFailedToast(errors.message)
    
    if (errors.data.length > 0) {
      this.utilityService.onShowingCustomAlert('error', 'Perhatian', errors.data)
    }


  }

  resetConditions(): void {
    this.conditionError.next(false)
    this.conditionError.complete()
  }


}
