import { environment } from "src/environment/environment";

// ** Setup Status Dokter
export const GET_ALL_SETUP_STATUS_DOKTER = `${environment.Api}` + `pis/SetupStatusDokter/GetAll`;
export const GET_BY_ID_SETUP_STATUS_DOKTER = `${environment.Api}` + `pis/SetupStatusDokter/GetById`;
export const POST_SAVE_SETUP_STATUS_DOKTER = `${environment.Api}` + `pis/SetupStatusDokter/Insert`;
export const DELETE_SETUP_STATUS_DOKTER = `${environment.Api}` + `pis/SetupStatusDokter/Delete/`;
export const PUT_UPDATE_SETUP_STATUS_DOKTER = `${environment.Api}` + `pis/SetupStatusDokter/Update`;