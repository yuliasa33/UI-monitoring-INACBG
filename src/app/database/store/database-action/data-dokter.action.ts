export class GETALLDOKTERACTION{
    static readonly type = '[GET ALL DOKTER]'
}

export class GETALLDOKTERFORLOOKUPADMISI{
    static readonly type = '[GET ALL DOKTER FOR LOOKUP ADMISI]'
    constructor(public payload:any,
                public id_poli:any
    ){}
}