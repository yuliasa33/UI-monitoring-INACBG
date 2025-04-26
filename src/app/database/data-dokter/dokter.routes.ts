import { Route } from "@angular/router";

export const dokterRoutes: Route[] = [
  {
    path: '',
    loadComponent: async () => (await (import('./data-dokter.component'))).DataDokterComponent,
    data: {
      title:'Data Dokter',
      breadcrumbs: [
          { label:'', icon:'pi pi-home' },
          { label:'Database' },
          { label:'Data Dokter' }
      ]
    },
  },
  {
    path: 'jadwal-dokter',
    loadComponent: async () => (await (import('./jadwal-dokter/jadwal-dokter.component'))).JadwalDokterComponent,
    data: {
      title:'Jadwal Dokter',
      breadcrumbs:[
          { label:'', icon:'pi pi-home' },
          { label:'Dokter' }, 
          { label:'Jadwal Dokter' }
      ]
    },
  },
  {
    path: 'cuti-dokter',
    loadComponent: async () => (await (import('./cuti-dokter/cuti-dokter.component'))).CutiDokterComponent,
    data: {
      title:'Cuti Dokter',
      breadcrumbs:[
          { label:'', icon:'pi pi-home' },
          { label:'Dokter' }, 
          { label:'Cuti Dokter' }
      ]
    },
  }
]