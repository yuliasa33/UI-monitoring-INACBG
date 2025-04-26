import { animation } from "@angular/animations";
import { Route } from "@angular/router";

export const PatientRoutes: Route[] = [
  {
    path: 'data-patient',
    loadComponent: async () => (await import('./data-patient/data-patient.component')).DataPatientComponent,
    data: {
      title: 'Data Patient',
      breadcrumbs: [{ label: '', icon: 'pi pi-home' }, { label: 'Patient' }, { label: 'Data Patient' }],
      animation: 'Data Patient'
    },


  },
  {
    path: 'add-patient',
    loadComponent: async () => (await import('./data-patient/add-patient/add-patient.component')).AddPatientComponent,
    data: {
      title: 'Data Patient',
      breadcrumbs: [{ label: '', icon: 'pi pi-home' }, { label: 'Patient' }, { label: 'Tambah Patient' }]
    }
  },
  {
    path:'admisi-pasien',
    loadComponent:async () => (await import('./admisi-pasien/admisi-pasien.component')).AdmisiPasienComponent,
    data: {
      title: 'Admisi Patient',
      breadcrumbs: [{ label: '', icon: 'pi pi-home' }, { label: 'Patient' }, { label: 'Admisi Pasien' }]
    }
  },
  {
    path:'list-pasien-dalam-layanan',
    loadComponent:async () => (await import('./list-pasien-pelayanan/list-pasien-pelayanan.component')).ListPasienPelayananComponent
    ,data: {
      title: 'List Pasien Dalam Layanan',
      breadcrumbs: [{ label: '', icon: 'pi pi-home' }, { label: 'Patient' }, { label: 'List Pasien Dalam Layanan' }]
    }
  },
  {
    path:'input-tarif-tindakan/:id',
    loadComponent:async ()=>(await import('./input-tarif-tindakan-pasien/input-tarif-tindakan-pasien.component')).InputTarifTindakanPasienComponent,
    data:{title:"Input Tarif Tindakan Pasien",
      breadcrumbs: [{ label: '', icon: 'pi pi-home' }, { label: 'Patient' }, { label: 'Tarif Tindakan Pasien' }]

    }
  }


]