import { Route } from "@angular/router";

export const wilayahRoutes: Route[] = [
  {
    path: 'provinsi',
    loadComponent: async () => (await (import('./provinsi/provinsi.component'))).ProvinsiComponent,
    data: {
      title:'Provinsi',
      breadcrumbs: [
          { label:'', icon:'pi pi-home' },
          { label:'Database' },
          { label:'Setup Wilayah' },
          { label:'Provinsi' },
      ]
    },
  },
  {
    path: 'kota',
    loadComponent: async () => (await (import('./kota/kota.component'))).KotaComponent,
    data: {
      title:'Kota',
      breadcrumbs:[
          { label:'', icon:'pi pi-home' },
          { label:'Database' },
          { label:'Setup Wilayah' },
          { label:'Kota' }
      ]
    },
  },
  {
    path: 'kecamatan',
    loadComponent: async () => (await (import('./kecamatan/kecamatan.component'))).KecamatanComponent,
    data: {
      title:'Kecamatan',
      breadcrumbs:[
          { label:'', icon:'pi pi-home' },
          { label:'Database' },
          { label:'Setup Wilayah' },
          { label:'Kecamatan' }
      ]
    },
  }
]