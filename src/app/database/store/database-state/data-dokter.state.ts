import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { SetupDokterService } from "../../services/setup-dokter/setup-dokter.service";
import { GETALLDOKTERACTION, GETALLDOKTERFORLOOKUPADMISI } from "../database-action/data-dokter.action";
import { tap } from "rxjs";


export interface DataDokterStateModel{
    dokter:any
}

@State<DataDokterStateModel>({
    name:'GETDOKTER',
    defaults:{
        dokter:{}
    }
})


@Injectable()

export class DataDokterState{

    constructor(private setupDokterService:SetupDokterService){}

    @Selector()
    static selectAddDokter(state:DataDokterStateModel){
        return state
    }
    @Selector()
    static selectDokterByLookupAdmisi(state:DataDokterStateModel){
        return state
    }

    @Action(GETALLDOKTERACTION)
    ongetAllDokterngxs(ctx:StateContext<DataDokterStateModel>){
        const state = ctx.getState()
        return this.setupDokterService.onGetAllDokter().pipe(
            tap((result:any)=>{
                ctx.setState({
                    ...state,
                    dokter:result
                })
            })
        )
    }

    @Action(GETALLDOKTERFORLOOKUPADMISI)
    onGetAllDokterForLookupAdmis(ctx:StateContext<DataDokterStateModel>,action:GETALLDOKTERFORLOOKUPADMISI){
        const state = ctx.getState()
        return this.setupDokterService.onGetAllDokterForLoookupAdmisi(action.payload,action.id_poli)
        .pipe(tap((result=>{
            ctx.setState({
                ...state,
                dokter:result
            })
        })))
    }


}