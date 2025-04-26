import { environment } from "src/environment/environment";

// ** Setup EDUCATION
export const GET_ALL_SETUP_EDUCATION = `${environment.Api}` + `pis/Education/GetAll`;
export const GET_BY_ID_SETUP_EDUCATION = `${environment.Api}` + `pis/Education/GetById`;
export const POST_SAVE_SETUP_EDUCATION = `${environment.Api}` + `pis/Education/Insert`;
export const DELETE_SETUP_EDUCATION = `${environment.Api}` + `pis/Education/Delete/`;
export const PUT_UPDATE_SETUP_EDUCATION = `${environment.Api}` + `pis/Education/Update`;