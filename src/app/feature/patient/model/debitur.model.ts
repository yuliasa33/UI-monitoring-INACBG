export interface IDebitur {
  id_debitur: number;
  kode_debitur: string;
  nama_debitur: string;
  alamat_debitur: string | null;
  telepon: string | null;
  email: string | null;
  tgl_expired: string | null;
  is_active: boolean;
  user_created: number;
  time_created: string;
  user_deactived: number;
  time_deactived: string;
}