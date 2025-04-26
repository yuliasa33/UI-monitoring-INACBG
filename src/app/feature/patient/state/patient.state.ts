import { State, Selector, Action, StateContext } from '@ngxs/store';
import { GetAllDebitur, GetPatient, GetPatientTeradmisiHariIni } from '../action/patient.action';
import { PatientService } from '../service/patient.service';
import { tap } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { IDebitur } from '../model/debitur.model';


export interface PatientStateModel{
    patient:any[]
    debiturs: IDebitur[]
}

export interface PatientTerAdmisiStateModel{
    patient_teradmisi:any[]
}

@State<PatientStateModel>({
    name:'patient',
    defaults:{
        patient:[],
        debiturs: []
    }
})


@State<PatientTerAdmisiStateModel>({
    name:'patientadmisi',
    defaults:{
        patient_teradmisi:[],
    }
})
@Injectable()
export class PatientState{

    constructor(
        private patientService: PatientService,
    ){}

    @Selector()
    static SelGetPatients(state:PatientStateModel){
        return state
    }

    @Selector()
    static selGetPatientAdmisi(State:PatientTerAdmisiStateModel){
        return State.patient_teradmisi
    }

    @Action(GetPatient)
    getPatient(ctx:StateContext<PatientStateModel>){
        const state = ctx.getState()
        return this.patientService.onGetData([]).pipe(
            tap((data: any) => {
                ctx.setState({
                    ...state, // Spread the existing state
                    patient: data.data, // Update the 'patient' property
                });
            })
        );
    }

    @Action(GetPatientTeradmisiHariIni)
        getPatientTeradmsiHariIni(ctx:StateContext<PatientTerAdmisiStateModel>,action:GetPatientTeradmisiHariIni){
            const state = ctx.getState()
            return this.patientService.onGetAllPasienRawatJalanTeradmisiHariIni(action.payload).pipe(
                tap((response:any)=>{
                    ctx.setState({
                        ...state,
                        patient_teradmisi:response.data
                    })
                })
            )
        }
    
    @Action(GetAllDebitur)
    getAllDebitur(ctx: StateContext<PatientStateModel>){
        return this.patientService.getAllDebitur()
        .pipe(tap((res) => {
            ctx.setState(prevState => {
                return {
                    ...prevState,
                    debiturs: res.data
                }
            })
        }))
    }

}