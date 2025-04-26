import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AtomButtonComponent } from './components/atom/atom-button/atom-button.component';
import { MolInputFieldsComponent } from './components/molecules/mol-input-fields/mol-input-fields.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { JwtInterceptor } from './components/helper/jwt.interceptor';
import { NgxsConfig } from '@ngxs/store/src/symbols';
import { NgxsModule } from '@ngxs/store';
import { PatientState } from './feature/patient/state/patient.state';
import { PatientService } from './feature/patient/service/patient.service';
import { ItemState } from './database/store/database-state/data-item.state';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { KewarganegaraanState } from './database/store/database-state/data-kewarganegaraan.state';
import { ICD10State } from './database/store/database-state/data-icd.state';
import { DataDokterState } from './database/store/database-state/data-dokter.state';
import { DataPoliState } from './database/store/database-state/data-poli.state';
import { DataTarifState } from './database/store/database-state/data-tarif.state';
import { SplashScreenComponent } from "./components/splash-screen/splash-screen.component";



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsModule.forRoot([PatientState, ItemState, KewarganegaraanState, ICD10State, DataDokterState, DataPoliState, DataTarifState]),
    SplashScreenComponent
],
  providers: [MessageService,
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true}
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
