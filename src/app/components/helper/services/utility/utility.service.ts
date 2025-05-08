import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  public loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private messageService:MessageService) { }

  showLoading() {
    this.loadingSubject.next(true);
  }

  hideLoading() {
    this.loadingSubject.next(false);
    console.log(this.loadingSubject)
  }


  onSuccessToast(messages:any):void{
    this.messageService.add({severity:'success',icon:'pi pi-check',summary:'Success',detail:messages,closable:true})
  }

  onFailedToast(message:any,detail?:any):void{
    this.messageService.add({severity:'error',icon:'pi pi-times',summary:'Failed',detail:message,closable:true})
  }

  onInfoToast(message:any):void{
    this.messageService.add({severity:'info',icon:'pi pi-info',summary:'Info',detail:message,closable:true})
  }

  customToast(severty:'success'|'info'|'warning'|'error'|'success'|string,Summary:string,message:string,icon:any):void{
    this.messageService.add({severity:severty,icon:icon,summary:Summary,detail:message,closable:true})
  }

  onShowLoadingBeforeSend(): void {
    Swal.fire({
      title: 'Tunggu Bentar yaw...',
      showCancelButton: false,
      showConfirmButton: false,
      showDenyButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
  }

  onShowingConfirmationAlert(icon: any, title: string, message: string, actionYes: () => any, actionNo: () => any): Promise<any> {
    return Swal.fire({
        icon,
        title,
        text: message,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Yes`,
        denyButtonText: `Tidak, Kembali`,
    }).then((result) => {
        if (result.isConfirmed) {
            actionYes();
        } else if (result.isDenied) {
            actionNo();
        }
    });
  }

  onShowingCustomAlert(icon:any,title:string,message:string):Promise<any>{
    return Swal.fire({
      icon,
      title,
      text: message,
    })
  }

  


}
