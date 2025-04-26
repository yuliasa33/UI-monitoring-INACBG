export class GETALLPOLI{
    static readonly type = '[GET DATA POLI]'
}

export class AddPOLI{
    static readonly type = '[ADD POLI]'
    constructor(public payload:any){}
}

export class EditPoli {
    static readonly type = '[EDIT POLI]'
    constructor(public payload: any) {}
}

export class DeletePoli {
    static readonly type = '[DELETE POLI]'
    constructor(public payload: string) {}
}