export class GetPatient{
    static readonly type = 'GET PATIENT'
}

export class GetPatientTeradmisiHariIni{
    static readonly type = 'GET PATIENT TERADMISI HARI INI'
    constructor(public payload:any){}
}

export class GetAllDebitur {
    static readonly type = 'GET ALL DEBITUR'
}