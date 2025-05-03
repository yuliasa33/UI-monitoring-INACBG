export namespace INACBG {
    export interface CLAIMINACBG {
        no_pendaftaran: string
        nik: string
        no_rm: string
        nama_pasien: string
        no_sep: string
        no_kartu: string
        nilai_klaim: number
        nilai_billing: number
        selisih_persen: number
        jumlah_hari: number
        tanggal_masuk: string
        tanggl_keluar: string
        kode_icd10_inacbg: KodeIcd10Inacbg
        kode_icd10_simgos: KodeIcd10Simgos
        diagnosa_inacbg: DiagnosaInacbg
        diagnosa_simgos: DiagnosaSimgos
        kode_icd9_inacbg: KodeIcd9Inacbg
        kode_icd9_simgos: KodeIcd9Simgos
        procedure_inacbg: ProcedureInacbg
        procedure_simgos: ProcedureSimgos
        jenis_rawat: string
        kode_jenis_rawat: string
        cara_masuk: string
        keterangan_cara_masuk: string
        cara_pulang: string
        kode_cara_pulang: string
    }
    export interface KodeIcd10Inacbg { }[]

    export interface KodeIcd10Simgos { }[]

    export interface DiagnosaInacbg { }[]

    export interface DiagnosaSimgos { }[]

    export interface KodeIcd9Inacbg { }[]

    export interface KodeIcd9Simgos { }[]

    export interface ProcedureInacbg { }[]

    export interface ProcedureSimgos { }[]
}