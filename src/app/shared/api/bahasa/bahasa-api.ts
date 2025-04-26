import { environment } from "src/environment/environment";

// ** Setup Bahasa
export const GET_ALL_SETUP_BAHASA = `${environment.Api}` + 'pis/Bahasa/GetAll';
export const GET_SETUP_BAHASA_BY_ID = `${environment.Api}` + 'pis/Bahasa/GetById';
export const POST_SAVE_SETUP_BAHASA = `${environment.Api}` + 'pis/Bahasa/Insert';
export const PUT_UPDATE_SETUP_BAHASA = `${environment.Api}` + 'pis/Bahasa/Update';
export const DELETE_SETUP_BAHASA = `${environment.Api}` + 'pis/Bahasa/Delete/';
