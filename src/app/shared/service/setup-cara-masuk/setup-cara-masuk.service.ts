import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { HttpResponseModel } from '../../model/http-response.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SetupCaraMasukService {

  public ListSetupCaraMasuk$ = new BehaviorSubject<any>([])
  ListCaraMasuk = this.ListSetupCaraMasuk$.asObservable()

  constructor(private httpRequest:HttpOperationService,
              private utilityService:UtilityService,
  ) { }

  getDataService():Observable<any>{
    const data = {
      page:1,
      count:100
    }
    return this.httpRequest.onGetRequestWithParams(`${environment.Api}v1/setup-cara-masuk/getAll`,data).
    pipe(catchError((error:any):any=>{
      this.utilityService.onFailedToast(error)
    }))
  }

  setDataSource():void{
    this.getDataService().subscribe(result=>{
      this.ListSetupCaraMasuk$.next(result.data.rows)
    })
  }

  resetVar():void{
    this.ListSetupCaraMasuk$.next([])
  }


}
