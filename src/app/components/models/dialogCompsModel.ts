export namespace DialogCompsModels{
    export interface Attributes{
        Headers:string
        Style:StyleDialogs
        position?:'top'|'bottom'|'center'|'left'|'right'|any
    }

    interface StyleDialogs{
        height:string
        width:string
    }
}