import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { GetAllTarif } from "../database-action/data-tarif.action";
import { SetupTarifService } from "../../services/setup-tarif/setup-tarif.service";
import { tap } from "rxjs";

export interface DataTarifStateModel{
    tarif:any
}


@State<DataTarifStateModel>({
    name:'Tarif',
    defaults:{
        tarif:{}
    }
})

@Injectable()
export class DataTarifState{
    constructor(public setupTarifService:SetupTarifService){
        this.setupTarifService.setDefaultPencarianFilter()
    }

    @Selector()
    static selectAllTarif(state:DataTarifStateModel){
        return state
    }

    @Action(GetAllTarif)
    onGetAllTarifState(ctx:StateContext<DataTarifStateModel>){
        const state = ctx.getState()
        return this.setupTarifService.getAllByDynamicFilter(this.setupTarifService.filter.getValue()).pipe(
            tap((response:any)=>{
                ctx.setState({
                    ...state,
                    tarif:response
                })
            })
        )
    }

}