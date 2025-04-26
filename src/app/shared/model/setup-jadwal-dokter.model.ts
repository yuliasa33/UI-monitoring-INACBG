interface WaktuModel {
  id_jadwal_dokter: number
  jam_mulai: any
  jam_selesai: any
  kuota: 15
  keterangan: string
}

export interface SetupHariModel {
  id_hari: number;
  nama_hari: string;
  waktu: WaktuModel[];
}

export interface DokterModel {
  id_dokter: number;
  id_person: number;
  full_name: string;
  kode_dokter: string;
  id_smf: number;
  id_spesialisasi_dokter: number;
  spesialisasi_dokter: string;
  id_status_dokter: number;
  no_str: string;
  tgl_exp_str: string; // atau bisa pakai Date jika mau diparsing
  no_surat_ijin_praktek: string;
  tgl_exp_surat_ijin_praktek: string; // atau Date
}

export interface JadwalDokterModel {
  id_dokter: number;
  id_poli: number;
  nama_dokter: string;
  nama_poli: string;
  jadwal: SetupHariModel[];
}

export interface AddJadwalDokterModel {
  id_poli: number;
  id_dokter: number;
  hari: number;
  jam_mulai: string;   
  jam_selesai: string; 
  kuota: number | string;
  keterangan: string;
}