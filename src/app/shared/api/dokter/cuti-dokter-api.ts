import { environment } from "src/environment/environment";

const BASE = `${environment.Api}pis/CutiDokter/`;

export const CUTI_DOKTER_GET_ALL = `${BASE}GetAll`;
export const CUTI_DOKTER_GET_BY_ID = `${BASE}GetById/`;
export const CUTI_DOKTER_INSERT = `${BASE}Insert`;
export const CUTI_DOKTER_UPDATE = `${BASE}Update`;
export const CUTI_DOKTER_UPDATE_STATUS = `${BASE}UpdateStatus`;
export const CUTI_DOKTER_GET_ALL_BY_DYNAMIC_FILTER = `${BASE}GetAllByDynamicFilter`;
