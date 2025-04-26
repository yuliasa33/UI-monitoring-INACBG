import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { SetupWargaNegaraService } from "../../services/setup-warga-negara/setup-warga-negara.service";
import { AddKewarganegaraan, DeleteKewarganegaraan, GetKewarganegaraan, UpdateKewarganegaraan } from "../database-action/data-kewarganegaraan.action";
import { tap } from "rxjs";

export interface KewarganegaraanStateModel{
    WN:any[]
}


@State<KewarganegaraanStateModel>({
    name:'WN',
    defaults:{
        WN:[]
    }
})

@Injectable()
export class KewarganegaraanState{

    constructor(private setupKewarganegaraan:SetupWargaNegaraService){}

    @Selector()
    static selectAllWargaNegaraGet(state:KewarganegaraanStateModel){
        return state
    }

    @Action(GetKewarganegaraan)
    getKewarganegaraan(ctx:StateContext<KewarganegaraanStateModel>){
        const state = ctx.getState()
        return this.setupKewarganegaraan.onGetAll()
        .pipe(tap(result=>{
            ctx.setState({
                ...state,
                WN:result.data
            })
        }))
    }

    @Action(AddKewarganegaraan)
    addKewarganegaraan(ctx:StateContext<KewarganegaraanStateModel>,action:AddKewarganegaraan){
        const state = ctx.getState()
        return this.setupKewarganegaraan.onPostSave(action.payload)
        .pipe(tap((Items:any)=>{
            ctx.setState({
                ...state,
                WN:[...state.WN,Items]
            })
        }))

    }

    @Action(UpdateKewarganegaraan)
    UpdateKewarganegaraan(
        ctx: StateContext<KewarganegaraanStateModel>,
        action: DeleteKewarganegaraan
    ){
        const state = ctx.getState()

        const updatedWN = state.WN.map(item => 
            item.kode_kebangsaan === action.payload.kode_kebangsaan 
                ? { ...item, ...action.payload }  // Update item jika cocok
                : item
        );
        
        return this.setupKewarganegaraan.onPutEdit(action.payload)
        .pipe(tap((data: any) => {
            ctx.patchState({
                WN: updatedWN
            })
        }))
    }

    @Action(DeleteKewarganegaraan)
    DeleteKewarganegaraan(ctx:StateContext<KewarganegaraanStateModel>,action:DeleteKewarganegaraan){
        const state = ctx.getState()
        return this.setupKewarganegaraan.onDelete(action.payload)
        .pipe(tap((data:any)=>{
            ctx.setState({
                ...state,
                WN:[...state.WN,data]
            })
        }))
    }

}