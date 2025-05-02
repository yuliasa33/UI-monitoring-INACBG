import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilityService } from './components/helper/services/utility/utility.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetAllDebitur, GetPatient } from './feature/patient/action/patient.action';
import { GetAllItem } from './database/store/database-action/data-item.action';
import { GetKewarganegaraan } from './database/store/database-action/data-kewarganegaraan.action';
import { GETALLICD10 } from './database/store/database-action/data-icd.action';
import { GETALLDOKTERACTION } from './database/store/database-action/data-dokter.action';
import { GETALLPOLI } from './database/store/database-action/data-poli.action';
import { GetAllTarif } from './database/store/database-action/data-tarif.action';
import { CookieService } from 'ngx-cookie-service';
import { static_token } from 'src/environment/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'absolute', width: '100%' }),
        animate('0.5s ease-in-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('fadeOutAnimation', [
      transition(':leave', [
        animate('0.5s ease-out', style({ opacity: 0 }))
      ])
    ])
  ],
})
export class AppComponent implements OnInit {
  title = 'projectpepen';
  isLoading: Observable<boolean>;



      

  constructor(public utilityService: UtilityService,
              private store:Store,
              private router:Router,
              private cookiesService:CookieService
  ) {
    this.cookiesService.set('static_token',static_token)
    this.isLoading = this.utilityService.loading$;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // console.log(event)
           this.utilityService.showLoading()
       
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
         setTimeout(() => {
           this.utilityService.hideLoading();
           this.onAnimationDone()
         }, 1000);
     
      }
    });
  }

  onAnimationDone(){

  }

  ngOnInit(): void {
    // this.initState()
    if(localStorage.getItem('udahLoginNich')){
      this.initState()
    }
  }

  initState():void{
    this.store.dispatch(new GetPatient())
    this.store.dispatch(new GetAllItem())
    this.store.dispatch(new GetKewarganegaraan())
    this.store.dispatch(new GETALLICD10())
    this.store.dispatch(new GETALLDOKTERACTION())
    this.store.dispatch(new GETALLPOLI())
    //  this.store.dispatch(new GetAllTarif())
    this.store.dispatch(new GetAllDebitur())
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] || '';
  }
}
