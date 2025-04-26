export interface InsertPersonRequest {
  no_identitas: string;
  no_kartu_keluarga: string;
  id_member: number;
  is_member: boolean;
  nama_lengkap: string;
  phone: string;
  alamat: string;
  email: string;
  gender: string;
  id_kebangsaan: number;
  kota: string;
  panggilan: string;
  tanggal_lahir: string;
  tempat_lahir: string;
  id_agama: number;
  id_job_type: number;
}

export interface UpdatePerson extends InsertPersonRequest {
  id_person: string
}

export interface IAgama {
  id_agama: string
  agama: string
}

export interface IJobType {
  id_job_type: string
  job_type: string
}