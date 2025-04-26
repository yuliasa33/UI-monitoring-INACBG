export class GetKewarganegaraan{
    static readonly type = "GET KEWARGANEGARAAN"
}

export class AddKewarganegaraan{
    static readonly type = "ADD KEWARGANEGARAAN"
    constructor(public payload:any){}
}

export class DeleteKewarganegaraan{
    static readonly type = 'DELETE KEWARGANEGARAAN'
    constructor(public payload:any){}
}

export class UpdateKewarganegaraan {
    static readonly type = 'UPDATE KEWARGANEGARAAN'
    constructor(public payload: any){}
}