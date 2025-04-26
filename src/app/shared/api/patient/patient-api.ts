import { environment } from "src/environment/environment";

export const GET_ALL_PERSON_PATIENT = `${environment.Api}pis/Person/PersonPasienGetAllByDynamicFilter`

export const GET_PASIEN_IRJA_TERADMISI_TODAY = `${environment.Api}admisi/Admisi/AdmisiPasienIrjaGetAllByDynamicFilter`

// Person
export const GET_PASIEN_BY_ID_PERSON = `${environment.Api}pis/Person/GetPersonPasienDetails/`
export const INSERT_PERSON = `${environment.Api}pis/Person/PendaftaranBaruPasienInsert`
export const UPDATE_PERSON = `${environment.Api}pis/Person/UpdatePersonV2`
export const AGAMA_GET_ALL = `${environment.Api}pis/Person/agamaGetAll`

// Job Type
export const GET_ALL_JOB_TYPE = `${environment.Api}pis/JobType/GetAll`

// Setup Member
export const GET_ALL_MEMBER = `${environment.Api}pis/SetupMember/GetMemberAll`

export const GET_PASIEN_IRJA_FOR_LOOKUP_ADMISI = `${environment.Api}pis/Transaksi/PasienIrjaGetAllForLookup`

export const INSERT_ADMISI_RAJAL_NON_PENJAMIN = `${environment.Api}admisi/Admisi/AdmisiIrjaNonPenjaminInsert`

export const BATAL_ADMISI = `${environment.Api}admisi/Admisi/AdmisiCancel`

export const INSERT_TARIF_TINDAKAN_PASIEN_IRJA = `${environment.Api}admisi/Transaksi/TransaksiIrjaInsert`

export const GET_RECORD_TRANS_TINDAKAN_IRJA_BY_ID_REGISTER = `${environment.Api}admisi/Transaksi/TransaksiIrjaGetHistoryByIdRegister/`

export const POST_GET_LOOKUP_PASIEN_FOR_TINDAKAN = `${environment.Api}admisi/Transaksi/PasienIrjaGetAllForLookup`

export const POST_GET_TARIF_BERLAKU_POLI = `${environment.Api}billing/tarif/SetupTarif/GetAllByDynamic_NotInTarifBerlaku_ByKelas`

// Setup Debitur
export const GET_ALL_DEBITUR = `${environment.Api}pis/SetupDebitur/GetAll`