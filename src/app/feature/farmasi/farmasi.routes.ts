import { Route } from "@angular/router";

export const FarmasiRoute: Route[] = [
    {
        path: 'antrian-farmasi',
        loadComponent: async () => (await (import('./antrian-farmasi/antrian-farmasi.component'))).AntrianFarmasiComponent,
        data: {
            title: 'Antrian Farmasi',
            breadcrumbs: [{ label: '', icon: 'pi pi-home' }, { label: 'Farmasi' }, { label: 'Antrian Farmasi' }]
        }
    }

]