import { environment } from "src/environment/environment";

// ** Setup Asal Rujukan
export const GET_ALL_ASAL_RUJUKAN = `${environment.Api}` + 'admisi/AsalRujukan/GetAll';
export const GET_ASAL_RUJUKAN_BY_ID = `${environment.Api}` + 'admisi/AsalRujukan/GetById/';
export const POST_SAVE_ASAL_RUJUKAN = `${environment.Api}` + 'admisi/AsalRujukan/Insert';
export const PUT_UPDATE_ASAL_RUJUKAN = `${environment.Api}` + 'admisi/AsalRujukan/Update';

// ** Get All Asal Rujukan For Lookup Admisi
export const GET_ALL_ASAL_RUJUKAN_FOR_LOOKUP_ADMISI = `${environment.Api}` + `admisi/Admisi/AsalRujukanGetAllForLookupAdmisi`;