import { Route } from "@angular/router";


export const databaseRoutes:Route[] = [
    {
        path: 'data-wilayah',
        loadChildren: async () => (await (import('./data-wilayah/data-wilayah.routes'))).wilayahRoutes,
    },
    {
        path:'data-debitur',
        loadComponent: async () => (await (import ('./data-debitur/data-debitur.component'))).DataDebiturComponent,
        data:{
            title:'Data Debitur',
            breadcrumbs:[
                { label:'', icon:'pi pi-home' },
                { label:'Database' }, 
                { label:'Data Debitur' }
            ]
        },
    },
    {
        path:'data-bahasa',
        loadComponent: async () => (await (import ('./data-bahasa/data-bahasa.component'))).DataBahasaComponent,
        data:{
            title:'Data Bahasa',
            breadcrumbs:[
                { label:'', icon:'pi pi-home' },
                { label:'Database' }, 
                { label:'Bahasa' }
            ]
        },
    },
    {
        path:'data-education',
        loadComponent: async () => (await (import ('./data-education/data-education.component'))).DataEducationComponent,
        data:{
            title:'Data Education',
            breadcrumbs:[
                { label:'', icon:'pi pi-home' },
                { label:'Database' }, 
                { label:'Education' }
            ]
        },
    },
    {
        path:'data-pekerjaan',
        loadComponent: async () => (await (import ('./data-pekerjaan/data-pekerjaan.component'))).DataPekerjaanComponent,
        data:{
            title:'Data Pekerjaan',
            breadcrumbs:[
                { label:'', icon:'pi pi-home' },
                { label:'Database' }, 
                { label:'Tipe Pekerjaan' }
            ]
        },
    },
    {
        path:'data-smf-dokter',
        loadComponent: async () => (await (import ('./data-smf/data-smf.component'))).DataSmfComponent,
        data:{
            title:'Data SMF Dokter',
            breadcrumbs:[
                { label:'', icon:'pi pi-home' },
                { label:'Database' }, 
                { label:'SMF Dokter' }
            ]
        },
    },
    {
        path:'data-etnis',
        loadComponent: async () => (await (import ('./data-etnis/data-etnis.component'))).DataEtnisComponent,
        data:{
            title:'Data Etnis',
            breadcrumbs:[
                { label:'', icon:'pi pi-home' },
                { label:'Database' }, 
                { label:'Etnis' }
            ]
        },
    },
    {
        path:'data-spesialisasi-dokter',
        loadComponent: async () => (await (import ('./data-spesialisasi-dokter/data-spesialisasi-dokter.component'))).DataSpesialisasiDokterComponent,
        data:{
            title:'Data Spesialisasi Dokter',
            breadcrumbs:[
                { label:'', icon:'pi pi-home' },
                { label:'Database' }, 
                { label:'Spesialiasi Dokter' }
            ]
        },
    },
    {
        path:'data-status-dokter',
        loadComponent: async () => (await (import ('./data-status-dokter/data-status-dokter.component'))).DataStatusDokterComponent,
        data:{
            title:'Data Status Dokter',
            breadcrumbs:[
                { label:'', icon:'pi pi-home' },
                { label:'Database' }, 
                { label:'Status Dokter' }
            ]
        },
    },
    {
        path:'data-asal-rujukan',
        loadComponent: async () => (await (import ('./data-asal-rujukan/data-asal-rujukan.component'))).DataAsalRujukanComponent,
        data:{
            title:'Data Asal Rujukan',
            breadcrumbs:[
                { label:'', icon:'pi pi-home' },
                { label:'Database' }, 
                { label:'Asal Rujukan' }
            ]
        },
    },
    {
        path:'data-grup-penunjang',
        loadComponent: async () => (await (import ('./data-order-penunjang/data-order-penunjang.component'))).DataOrderPenunjangComponent,
        data:{
            title:'Data Grup Penunjang',
            breadcrumbs:[
                { label:'', icon:'pi pi-home' },
                { label:'Database' }, 
                { label:'Grup Penunjang' }
            ]
        },
    },
    {
        path:'data-item',
        loadComponent: async () => (await (import ('./data-item/data-item.component'))).DataItemComponent,
        data:{
            title:'Data Item',
            breadcrumbs:[
                { label:'', icon:'pi pi-home' },
                { label:'Database' }, 
                { label:'Data Item' }
            ]
        },
    },
    {
        path: 'data-satuan',
        loadComponent: async () => (await import('./data-item/data-satuan/data-satuan.component')).DataSatuanComponent,
        data:{
            title:'Data Satuan',
            breadcrumbs:[
                { label: '', icon: 'pi pi-home' },
                { label: 'Database' }, 
                { label: 'Data Satuan' }
            ],
        },
    },
    {
        path:'data-provinsi',
        loadComponent: async () => (await(import('./data-provinsi/data-provinsi.component'))).DataProvinsiComponent,
        data:{
            title:'Data Item',
            breadcrumbs:[{label:'',icon:'pi pi-home'},{label:'Database'},{label:'Data Provinsi'}],
        }
    },
    {
        path:'data-warga-negara',
        loadComponent:async()=>(await(import('./data-warganegara/data-warganegara.component'))).DataWarganegaraComponent,
        data:{
            title:'Data Kewarganegaraan',
            breadcrumbs:[{label:'',icon:'pi pi-home'},{label:'Database'},{label:'Data Kewarganegaraan'}]}
    },
     {
        path:'data-icd-10',
        loadComponent:async()=>(await(import('./dataicd10/dataicd10.component'))).Dataicd10Component,
        data:{
            title:'Data ICD 10',
            breadcrumbs:[{label:'',icon:'pi pi-home'},{label:'Database'},{label:'Data ICD 10'}]}
    },
    {
        path:'data-dokter',
        // loadComponent:async()=>(await(import('./data-dokter/data-dokter.component'))).DataDokterComponent,
        loadChildren: async () => (await (import('./data-dokter/dokter.routes'))).dokterRoutes,
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
        path:'data-poli',
        loadComponent:async()=>(await(import('./data-poli/data-poli.component'))).DataPoliComponent,
        data:{
            title:'Data Poli',
            breadcrumbs:[{label:'',icon:'pi pi-home'},{label:'Database'},{label:'Data Poli'}]}
    },
    {
        path:'data-tarif',
        loadComponent:async()=>(await(import('./data-tarif/data-tarif.component'))).DataTarifComponent,
        data:{
            title:'Data Tarif',
            breadcrumbs:[{label:'',icon:'pi pi-home'},{label:'Database'},{label:'Data Tarif'}]}
    },

]