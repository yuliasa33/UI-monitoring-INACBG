import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { SetupPoliService } from "../../services/setup-poli/setup-poli.service";
import { AddPOLI, DeletePoli, EditPoli, GETALLPOLI } from "../database-action/data-poli.action";
import { tap } from "rxjs";

export interface DataPoliStateModel{
    poli:any
}


@State<DataPoliStateModel>({
    name:'Poli',
    defaults:{
        poli:{}
    }
})

@Injectable()

export class DataPoliState{

    constructor(private setupPoliService: SetupPoliService){}

    @Selector()
    static selectPoliAll(state:DataPoliStateModel){
        return state
    }

    @Action(GETALLPOLI)
    getPoliklikin(ctx:StateContext<DataPoliStateModel>){
        
        const state = ctx.getState()
        return this.setupPoliService.onGetAll().pipe(tap((response:any)=>{
            ctx.setState({
                ...state,
                poli: response
            })
        }))
    }

    @Action(AddPOLI)
    handleAddPoli(ctx:StateContext<DataPoliStateModel>,action:AddPOLI){
        const state = ctx.getState()
        return this.setupPoliService.onPostSave(action.payload).pipe(
            tap((response:any)=>{
                ctx.setState({
                    ...state,
                    poli:response
                })
            })
        )
    }

    @Action(EditPoli)
    handleEditPoli(ctx: StateContext<DataPoliStateModel>, action: EditPoli){
        const state = ctx.getState()
        return this.setupPoliService.onPutSave(action.payload).pipe(
            tap((response: any) => {
                ctx.setState({
                    ...state,
                    poli: response
                })
            })
        )
    }

    @Action(DeletePoli)
    handleDeletePoli(ctx: StateContext<DataPoliStateModel>, action: DeletePoli){
        const state = ctx.getState()
        return this.setupPoliService.onDelete(action.payload).pipe(
            tap((response: any) => {
                ctx.setState({
                    ...state,
                    poli: response
                })
            })
        )
    }
}