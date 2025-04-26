import { environment } from "src/environment/environment";

const BASE = `${environment.Api}pis/Wilayah/`;

export const PROVINSI_GET_ALL = `${BASE}ProvinsiGetAll`;
export const PROVINSI_GET_BY_ID = `${BASE}ProvinsiGetById`;
export const PROVINSI_INSERT = `${BASE}ProvinsiInsert`;
export const PROVINSI_UPDATE = `${BASE}ProvinsiUpdate`;
export const PROVINSI_DELETE = `${BASE}ProvinsiDelete`;

export const KOTA_GET_ALL = `${BASE}KotaGetAllByKodeProvinsi`;
export const KOTA_GET_BY_ID = `${BASE}KotaGetById`;
export const KOTA_INSERT = `${BASE}KotaInsert`;
export const KOTA_UPDATE = `${BASE}KotaUpdate`;
export const KOTA_DELETE = `${BASE}KotaDelete`;
export const KOTA_GET_BY_PROVINSI_ID = `${BASE}KotaGetByKodeProvinsi`;

export const KECAMATAN_GET_ALL = `${BASE}KecamatanGetAllByKodeKota`;
export const KECAMATAN_GET_BY_ID = `${BASE}KecamatanGetById`;
export const KECAMATAN_INSERT = `${BASE}KecamatanInsert`;
export const KECAMATAN_UPDATE = `${BASE}KecamatanUpdate`;
export const KECAMATAN_DELETE = `${BASE}KecamatanDelete`;
export const KECAMATAN_GET_BY_KOTA_ID = `${BASE}KecamatanGetByKodeKota`;