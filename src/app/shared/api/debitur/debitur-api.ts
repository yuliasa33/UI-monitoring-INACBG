import { environment } from "src/environment/environment";

// ** Setup Debitur
export const GET_ALL_SETUP_DEBITUR = `${environment.Api}` + 'pis/SetupDebitur/GetAll';
export const GET_SETUP_DEBITUR_BY_ID = `${environment.Api}` + 'pis/SetupDebitur/GetById/';
export const POST_SAVE_SETUP_DEBITUR = `${environment.Api}` + 'pis/SetupDebitur/Insert';
export const PUT_UPDATE_SETUP_DEBITUR = `${environment.Api}` + 'pis/SetupDebitur/Update';
export const DELETE_SETUP_DEBITUR = `${environment.Api}` + 'pis/SetupDebitur/Delete/';

// ** Get All Debitur By Person Id For Lookup Admisi
export const GET_ALL_DEBITUR_FOR_LOOKUP_ADMISI = `${environment.Api}` + 'admisi/Admisi/DebiturPasienGetByIdPersonForLookupAdmisi/';