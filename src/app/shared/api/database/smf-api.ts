import { environment } from "src/environment/environment";

// ** Setup Smf Dokter
export const GET_ALL_SETUP_SMF = `${environment.Api}` + `pis/SetupSmf/GetAll`;
export const GET_BY_ID_SETUP_SMF = `${environment.Api}` + `pis/SetupSmf/GetById`;
export const POST_SAVE_SETUP_SMF = `${environment.Api}` + `pis/SetupSmf/Insert`;
export const DELETE_SETUP_SMF = `${environment.Api}` + `pis/SetupSmf/Delete/`;
export const PUT_UPDATE_SETUP_SMF = `${environment.Api}` + `pis/SetupSmf/Update`;