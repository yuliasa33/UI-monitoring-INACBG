export interface DebiturModel {
  id_debitur: number;
  kode_debitur: string;
  nama_debitur: string;
  alamat_debitur: string;
  telepon: string;
  email: string;
  tgl_expired: string; // atau Date jika ingin langsung parsing ke Date
  is_active: boolean;
  user_created: number;
  time_created: string; // atau Date
  user_deactived: number;
  time_deactived: string; // atau Date
}

export interface DebiturInsert {
  kode_debitur: string;
  nama_debitur: string;
  alamat_debitur: string;
  telepon: string;
  email: string;
  tgl_expired: string; // atau Date, tergantung kebutuhan
}