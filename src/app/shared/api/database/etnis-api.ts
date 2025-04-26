import { environment } from "src/environment/environment";

// ** Setup Etnis
export const GET_ALL_SETUP_ETNIS = `${environment.Api}` + 'pis/Etnis/GetAll';
export const GET_BY_ID_SETUP_ETNIS = `${environment.Api}` + 'pis/Etnis/GetById';
export const POST_SAVE_SETUP_ETNIS = `${environment.Api}` + 'pis/Etnis/Insert';
export const DELETE_SETUP_ETNIS = `${environment.Api}` + 'pis/Etnis/Delete/';
export const PUT_UPDATE_SETUP_ETNIS = `${environment.Api}` + `pis/Etnis/Update`;