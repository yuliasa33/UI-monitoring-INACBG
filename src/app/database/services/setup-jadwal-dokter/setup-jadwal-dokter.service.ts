import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpOperationService } from 'src/app/components/helper/services/http/http-operation.service';
import { environment } from 'src/environment/environment';
import { HttpResponseModel } from 'src/app/shared/model/http-response.model';
import { DokterModel, JadwalDokterModel, SetupHariModel } from 'src/app/shared/model/setup-jadwal-dokter.model';


// ** Setup Jadwal Dokter
export const GET_ALL_SETUP_HARI = `${environment.Api}` + `pis/JadwalDokter/SetupHariGetAll`;
export const POST_GET_ALL_DOKTER_FOR_LOOKUP = `${environment.Api}` + `pis/JadwalDokter/DokterGetAllForLookup`;
export const POST_GET_ALL_JADWAL_DOKTER_BY_ID_DOKTER_AND_ID_POLI = `${environment.Api}` + `pis/JadwalDokter/GetAllByIdDokterAndIdPoli`;
export const POST_GET_ALL_DOKTER_BY_ID_POLI = `${environment.Api}` + `pis/JadwalDokter/DokterGetAllForLookupByIdPoli/`;
export const POST_SAVE_JADWAL_DOKTER = `${environment.Api}` + `pis/JadwalDokter/Insert`;
export const DELETE_JADWAL_DOKTER_BY_ID_JADWAL_DOKTER = `${environment.Api}` + `pis/JadwalDokter/Delete/`;

@Injectable({
    providedIn: 'root'
})
export class SetupJadwalDokterService {
    constructor(
      private httpOperationService: HttpOperationService
    ) {}

    onGetAllHari(): Observable<HttpResponseModel<SetupHariModel>> {
      return this.httpOperationService.onGetRequest(GET_ALL_SETUP_HARI);
    }

    onPostGetAllJadwalDokterByIdDokterAndIdPoli(id_dokter: number, id_poli: number): Observable<HttpResponseModel<JadwalDokterModel>> {
      return this.httpOperationService.onPostRequest(POST_GET_ALL_JADWAL_DOKTER_BY_ID_DOKTER_AND_ID_POLI, {
        id_dokter: id_dokter,
        id_poli: id_poli
      });
    }

    onGetAllDokterByPoliId(PoliId: number): Observable<HttpResponseModel<DokterModel[]>> {
      return this.httpOperationService.onPostRequest(POST_GET_ALL_DOKTER_BY_ID_POLI + PoliId, [])
    }

    onPostSaveJadwalDokter(Data: any): Observable<HttpResponseModel> {
      return this.httpOperationService.onPostRequest(POST_SAVE_JADWAL_DOKTER, Data)
    }

    onDeleteJadwalDokter(JadwalDokterId: number): Observable<HttpResponseModel> {
      return this.httpOperationService.onDeleteRequest(DELETE_JADWAL_DOKTER_BY_ID_JADWAL_DOKTER + JadwalDokterId)
    }
}
