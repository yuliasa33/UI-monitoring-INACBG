
export class GetAllItem{
    static readonly type = 'ALL ITEMS' 
}

export class AddItem{
    static readonly type = "ADD ITEMS"
    constructor(public payload:any){}
}

