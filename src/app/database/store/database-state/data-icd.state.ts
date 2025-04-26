import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { GETALLICD10 } from "../database-action/data-icd.action";
import { SetupIcd10Service } from "../../services/setup-icd-10/setup-icd-10.service";
import { tap } from "rxjs";


export interface ICD10StateModel{
    icd10:any
}

@State<ICD10StateModel>({
    name:'ICD10',
    defaults:{
        icd10:{}
    }
})

@Injectable()
export class ICD10State{


    constructor(private setupIcd10Service:SetupIcd10Service){}

    @Selector()
    static selectAllIcd10(state:ICD10StateModel){
        return state.icd10
    }


    @Action(GETALLICD10)
    getAllIcd10(ctx:StateContext<ICD10StateModel>){
        const state = ctx.getState()
        return this.setupIcd10Service.onGetAll().pipe(tap((data:any)=>{
            ctx.setState({
                ...state,
                icd10:data
            })
        }))
    }

}