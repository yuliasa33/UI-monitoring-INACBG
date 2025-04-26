import { environment } from "src/environment/environment";

// ** Setup Spesialisasi Dokter
export const GET_ALL_SETUP_SPESIALISASI_DOKTER = `${environment.Api}` + `pis/SpesialisasiDokter/GetAll`;
export const GET_BY_ID_SETUP_SPESIALISASI_DOKTER = `${environment.Api}` + `pis/SpesialisasiDokter/GetById/`;
export const POST_SAVE_SETUP_SPESIALISASI_DOKTER = `${environment.Api}` + `pis/SpesialisasiDokter/Insert`;
export const DELETE_SETUP_SPESIALISASI_DOKTER = `${environment.Api}` + `pis/SpesialisasiDokter/Delete/`;
export const PUT_UPDATE_SETUP_SPESIALISASI_DOKTER = `${environment.Api}` + `pis/SpesialisasiDokter/Update`;