import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddItem, GetAllItem } from "../database-action/data-item.action";
import { SetupitemService } from "../../services/setup-item/setupitem.service";
import { tap } from "rxjs";

export interface ItemsStateModel{
    dataItem:any[]
}


@State<ItemsStateModel>({
    name:'item',
    defaults:{
        dataItem:[]
    }
})

@Injectable()
export class ItemState{

    constructor(private setupItemService:SetupitemService){}

    @Selector()
    static selectorGetitem(state:ItemsStateModel){
        return state
    }

    @Action(GetAllItem)
    getAllItems(ctx:StateContext<ItemsStateModel>){
        
        const state = ctx.getState()
        return this.setupItemService.onGetDataSetupItemByParams([])
        .pipe(tap((result:any)=>{
           ctx.setState({
            ...state,
            dataItem:result?.data
           })
        }))
    }

    @Action(AddItem)
    addItems(ctx:StateContext<ItemsStateModel>,action:AddItem){
        const state = ctx.getState()
        return this.setupItemService.onPostSave(action.payload)
        .pipe(tap(result=>{
            ctx.setState({
                ...state,
                dataItem:result?.data
            })
        }))
    }
}