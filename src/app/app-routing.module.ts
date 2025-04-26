import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/helper/auth.guard';
import { animation } from '@angular/animations';

const routes: Routes = [
  // {path:'',
  //   loadComponent:async () => (await import('./authentication/pages/authentication/authentication.component')).AuthenticationComponent
  // },
  // {path:'Dashboard',
  //   loadComponent:async () => (await import('./dashboard/pages/dashboard/dashboard.component')).DashboardComponent,
  //   canActivate:[AuthGuard],
  //   data:{
  //     title:'Dashboard',
  //     breadcrumbs:[{label:'',icon:'pi pi-home'},{label:'Dashboard'}]
  //   ,
  // animation:'Dashboard'}
  {path:'',
    loadComponent:async () => (await import('./dashboard/pages/dashboard/dashboard.component')).DashboardComponent,
    data:{
      title:'Dashboard',
      breadcrumbs:[{label:'',icon:'pi pi-home'},{label:'Dashboard'}]
    ,
  animation:'Dashboard'}
  }
  // {path:'Patient',
  //   canActivate:[AuthGuard],
  //   loadComponent:async () => (await import('./feature/patient/data-patient/data-patient.component')).DataPatientComponent,
  //   data:{
  //     title:'Patient',
  //     breadcrumbs:[{label:'',icon:'pi pi-home'},{label:'Patient'}]}
  // },
  // {
  //   path:'Patient',
  //   loadChildren:async()=>(await import('./feature/patient/patient.routes')).PatientRoutes,
  //   canActivate:[AuthGuard]
  // },
  // {
  //   path:'Database',
  //   loadChildren:async ()=>(await (import('./database/database.routes'))).databaseRoutes,
  //   canActivate:[AuthGuard]
  // },
  // {
  //   path:'Farmasi',
  //   loadChildren:async () => (await (import ('./feature/farmasi/farmasi.routes'))).FarmasiRoute,
  //   canActivate:[AuthGuard]
  // }
  ,
   { path: '**', loadComponent:async ()=>(await import('./feature/un-routed-pages/un-routed-pages.component')).UnRoutedPagesComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
