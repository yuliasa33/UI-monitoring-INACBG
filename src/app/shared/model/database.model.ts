export interface SmfModel {
  id_smf: number;
  kode_smf: string;
  nama_smf: string;
}

export interface EtnisModel {
  id_etnis: number;
  etnis: string;
}

export interface SpesialisasiDokterModel {
  id_spesialisasi_dokter: number;
  kode_spesialisasi_dokter: string;
  spesialisasi_dokter: string;
}

export interface StatusDokterModel {
  id_status_dokter: number;
  status_dokter: string;
}

export interface AsalRujukanModel {
  id_asal_rujukan?: number;
  kode_asal_rujukan?: string;
  nama_asal_rujukan?: string;
  is_required_kode_wilayah?: boolean;
}

export interface GrupPenunjangModel {
  kode_grup_penunjang: string;
  nama_grup_penunjang: string;
}