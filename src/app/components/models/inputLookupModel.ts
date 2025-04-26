import { TableProps } from "./tableProps.model"

export namespace InputLookUp {

    export interface TableLookup{
    Headers:string
    Label:any
    Value:any
    tableDataAttr?:any
    }

    export interface columnTable{
        fields:string,
        header:string
    }[]

}

