export interface InsertCutiDokterModel {
  id_dokter: number;
  tgl_mulai_cuti: string;   // format ISO string, contoh: "2025-04-14T07:47:19.969Z"
  tgl_selesai_cuti: string; // sama dengan di atas
  keterangan: string;
}

export interface UpdateStatusCutiDokterModel {
  id_dokter: number
  is_active: boolean
}

export interface CutiDokterModel {
  id_dokter: number;
  nama_dokter: string;
  spesialisasi_dokter: string;
  tgl_mulai_cuti: string; // ISO string (format: YYYY-MM-DDTHH:mm:ss.sssZ)
  tgl_selesai_cuti: string;
  keterangan: string;
  is_active: boolean;
}
