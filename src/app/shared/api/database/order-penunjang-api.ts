import { environment } from "src/environment/environment";

// ** Setup Grup Penunjang
export const GET_ALL_SETUP_GRUP_PENUNJANG = `${environment.Api}` + `pis/OmSetupGrupPenunjang/GetAll`;
export const GET_BY_ID_SETUP_GRUP_PENUNJANG = `${environment.Api}` + `pis/OmSetupGrupPenunjang/GetById/`;
export const POST_SAVE_SETUP_GRUP_PENUNJANG = `${environment.Api}` + `pis/OmSetupGrupPenunjang/Insert`;
export const DELETE_SETUP_GRUP_PENUNJANG = `${environment.Api}` + `pis/OmSetupGrupPenunjang/Delete/`;
export const PUT_UPDATE_SETUP_GRUP_PENUNJANG = `${environment.Api}` + `pis/OmSetupGrupPenunjang/Update`;