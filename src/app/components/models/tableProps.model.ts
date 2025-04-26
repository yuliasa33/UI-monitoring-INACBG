export namespace TableProps{
    export interface Table{
        toolbars?: any
        datasource:any[] ,
        columns:FieldTable[],
        pagination:number,
        filteredBy?:any[string],
        getRowClass?:any
    }
    export interface FieldTable{
       style?: any
       field?:any,
       header?:any,
       type?: "button" | "toggle" | any
       button?:BTN[]
       toggleProps?: ToggleProps
       format?:any
       headerStyle?:any
    }[]

    export interface BTN{
        buttonLabel?:any
        buttonIcon?:any
        onClick?:any
        buttonClass:"p-button-sm p-button-warning p-button-rounded p-button-outlined" | any
    }[]
    
    export interface ToggleProps {
        label?: string
        checked?: boolean
        valueChange?: (checked: boolean, data: any) => void
    }
}