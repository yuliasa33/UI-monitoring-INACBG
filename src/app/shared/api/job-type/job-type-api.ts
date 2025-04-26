import { environment } from "src/environment/environment";

// ** Setup JOB_TYPE
export const GET_ALL_SETUP_JOB_TYPE = `${environment.Api}` + `pis/JobType/GetAll`;
export const GET_BY_ID_SETUP_JOB_TYPE = `${environment.Api}` + `pis/JobType/GetById`;
export const POST_SAVE_SETUP_JOB_TYPE = `${environment.Api}` + `pis/JobType/Insert`;
export const DELETE_SETUP_JOB_TYPE = `${environment.Api}` + `pis/JobType/Delete/`;
export const PUT_UPDATE_SETUP_JOB_TYPE = `${environment.Api}` + `pis/JobType/Update`;