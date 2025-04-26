export interface PoliModel {
  id_poli: number;
  id_jenis_ruangan: number;
  jenis_ruangan: string;
  id_outlet: number;
  jenis_rawat: string;
  kode_poli: string;
  nama_poli: string;
  is_active: boolean;
  jumlah_tarif_poli: number;
  id_poli_parent: number;
  id_jenis_ruangan_parent: number;
  jenis_ruangan_parent: string;
  id_outlet_parent: number;
  jenis_rawat_parent: string;
  kode_poli_parent: string;
  nama_poli_parent: string;
  is_active_parent: boolean;
}