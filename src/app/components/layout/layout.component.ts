import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ButtonNavModel } from '../models/buttonNavModel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter, map } from 'rxjs';
import { UtilityService } from '../helper/services/utility/utility.service';
import Swal from 'sweetalert2';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BoxCompsComponent } from "../box/box-comps/box-comps.component";
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
    PanelMenuModule,
    InputTextModule,
    ButtonModule, 
    BreadcrumbModule,
    SidebarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    trigger('contentAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ opacity: 0, transform: 'translateY(30px)' }))
      ])
    ]),
    // trigger('sidebarState', [
    //   state(
    //     'hidden',
    //     style({
    //       transform: 'translateX(-130%)',
    //     })
    //   ),
    //   state(
    //     'visible',
    //     style({
    //       transform: 'translateX(0%)',
    //     })
    //   ),
    //   transition('hidden <=> visible', animate('500ms ease-in-out')),
    // ]),
    trigger('contentState', [
      state(
        'collapsed',
        style({
          marginLeft: '0px', // No margin when sidebar is hidden
          width:'100%',
          flex:'none'// Full width when sidebar is hidden
        })
      ),
      state(
        'extended',
        style({
          marginLeft: '0px', // Sidebar width when visible
          width: 'calc(100% - 350px)', // Adjust content width based on sidebar width
        })
      ),
      transition('collapsed <=> extended', animate('500ms ease-in-out')),
    ]),
    trigger('sidebarState', [
      state(
        'minimize',
        style({
          width:'54px',      
        })
      ),
      state(
        'maximize',
        style({
          width: '240px', // Adjust content width based on sidebar width
        })
      ),
      transition('minimize <=> maximize', animate('500ms ease-in-out')),
    ]),
  ],
})
export class LayoutComponent implements OnInit {
  sidebarState: boolean = false
  
  salamState:any = ''
  
  sidebarItems: MenuItem[] = [];
  menuItems: MenuItem[] = this.sidebarItems;
  
  breadcrumbItems: any[] = []

  searchMenu?: string
  searchMenuItems?: MenuItem[]
  
  @Input('ButtonNav') ButtonNav: ButtonNavModel[] = []

  @Output('onClickButtonNav') onClickButtonNav = new EventEmitter<any>()
  
  @Input('withBox') withBox: boolean = false

  isDarkMode: boolean = false;

  isShow:boolean = true

  userMenu:any[] = []

  userData:any

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private renderer:Renderer2,
    private utilityService:UtilityService
  ) {
    this.router.events
    .pipe(
      filter((event:any) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route:any) => {
        return route.data;
      })
    )
    .subscribe((breadcrumbs) => {
       this.breadcrumbItems = breadcrumbs._value.breadcrumbs
    });

    let user = localStorage.getItem('udahLoginNich')
    this.userData = user
    this.userData = JSON.parse(this.userData)
  }

  onCheckWaktu():void{
    
  }

  handleMouseEnter():void{
    this.isShow = true
  }

  handleMouseLeave():void{
    this.isShow = false
  }

  toggleSidebar():void{
    this.isShow = !this.isShow
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  checkActiveState(givenLink: string) {
    if (this.router.url.indexOf(givenLink) === -1) {
      return false;
    }
    return true
  }

  checkExactActiveState(givenLink: string): boolean {
    return this.router.url === givenLink;
  }

  ngOnInit(): void {
      // this.setMenu()
    this.sidebarItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-th-large',
        routerLink: '/',
        styleClass: this.checkExactActiveState('/Dashboard') ? "menu-active" : "",
      },
      // {
      //   label: 'Database',
      //   icon: 'pi pi-database',
      //   expanded: this.checkActiveState('/Database'),
      //   items: [
      //     { 
      //       label: 'Setup Wilayah', 
      //       icon: 'pi pi-map',
      //       expanded: this.checkActiveState('/Database/data-wilayah'),
      //       items: [
      //         {
      //           label: 'Kota',
      //           icon: 'pi pi-map-marker',
      //           routerLink: '/Database/data-wilayah/kota',
      //           expanded: this.checkActiveState('/Database/data-wilayah/kota'),
      //           styleClass: this.checkExactActiveState('/Database/data-wilayah/kota') ? "menu-active" : ""
      //         },
      //         {
      //           label: 'Provinsi',
      //           icon: 'pi pi-map-marker',
      //           routerLink: '/Database/data-wilayah/provinsi',
      //           expanded: this.checkActiveState('/Database/data-wilayah/provinsi'),
      //           styleClass: this.checkExactActiveState('/Database/data-wilayah/provinsi') ? "menu-active" : "",
      //         },
      //         {
      //           label: 'Kecamatan',
      //           icon: 'pi pi-map-marker',
      //           routerLink: '/Database/data-wilayah/kecamatan',
      //           expanded: this.checkActiveState('/Database/data-wilayah/kecamatan'),
      //           styleClass: this.checkExactActiveState('/Database/data-wilayah/kecamatan') ? "menu-active" : "",
      //         },
      //       ]
      //     },
      //     { 
      //       label: 'Debitur', 
      //       icon: 'pi pi-briefcase', 
      //       routerLink: '/Database/data-debitur',
      //       expanded: this.checkExactActiveState('/Database/data-debitur'),
      //       styleClass: this.checkExactActiveState('/Database/data-debitur') ? "menu-active" : "",
      //     },
      //     { 
      //       label: 'Bahasa', 
      //       icon: 'pi pi-language', 
      //       routerLink: '/Database/data-bahasa',
      //       expanded: this.checkExactActiveState('/Database/data-bahasa'),
      //       styleClass: this.checkExactActiveState('/Database/data-bahasa') ? "menu-active" : "",
      //     },
      //     { 
      //       label: 'Education', 
      //       icon: 'pi pi-cloud', 
      //       routerLink: '/Database/data-education',
      //       expanded: this.checkExactActiveState('/Database/data-education'),
      //       styleClass: this.checkExactActiveState('/Database/data-education') ? "menu-active" : "",
      //     },
      //     { 
      //       label: 'Pekerjaan', 
      //       icon: 'pi pi-slack', 
      //       routerLink: '/Database/data-pekerjaan',
      //       expanded: this.checkExactActiveState('/Database/data-pekerjaan'),
      //       styleClass: this.checkExactActiveState('/Database/data-pekerjaan') ? "menu-active" : "",
      //     },
      //     { 
      //       label: 'SMF Dokter', 
      //       icon: 'pi pi-list', 
      //       routerLink: '/Database/data-smf-dokter',
      //       expanded: this.checkExactActiveState('/Database/data-smf-dokter'),
      //       styleClass: this.checkExactActiveState('/Database/data-smf-dokter') ? "menu-active" : "",
      //     },
      //     { 
      //       label: 'Etnis', 
      //       icon: 'pi pi-users', 
      //       routerLink: '/Database/data-etnis',
      //       expanded: this.checkExactActiveState('/Database/data-etnis'),
      //       styleClass: this.checkExactActiveState('/Database/data-etnis') ? "menu-active" : "",
      //     },
      //     { 
      //       label: 'Spesialisasi Dokter', 
      //       icon: 'pi pi-user', 
      //       routerLink: '/Database/data-spesialisasi-dokter',
      //       expanded: this.checkExactActiveState('/Database/data-spesialisasi-dokter',),
      //       styleClass: this.checkExactActiveState('/Database/data-spesialisasi-dokter') ? "menu-active" : "",
      //     },
      //     { 
      //       label: 'Status Dokter', 
      //       icon: 'pi pi-list', 
      //       routerLink: '/Database/data-status-dokter',
      //       expanded: this.checkExactActiveState('/Database/data-status-dokter',),
      //       styleClass: this.checkExactActiveState('/Database/data-status-dokter') ? "menu-active" : "",
      //     },
      //     { 
      //       label: 'Asal Rujukan', 
      //       icon: 'pi pi-directions',
      //       routerLink: '/Database/data-asal-rujukan',
      //       expanded: this.checkExactActiveState('/Database/data-asal-rujukan',),
      //       styleClass: this.checkExactActiveState('/Database/data-asal-rujukan') ? "menu-active" : "",
      //     },
      //     { 
      //       label: 'Data Tarif', 
      //       icon: 'pi pi-dollar', 
      //       routerLink: '/Database/data-tarif',
      //       expanded: this.checkExactActiveState('/Database/data-tarif'),
      //       styleClass: this.checkExactActiveState('/Database/data-tarif') ? "menu-active" : "",
      //     },
      //     { 
      //       label: 'Data Obat', 
      //       icon: 'pi pi-shield',
      //       items: [
      //         {
      //           label: 'Obat',
      //           icon: 'pi pi-shield',
      //           routerLink: '/Database/data-item',
      //           expanded: this.checkActiveState('/Database/data-item'),
      //           styleClass: this.checkExactActiveState('/Database/data-item') ? "menu-active" : ""
      //         },
      //         {
      //           label: 'Satuan',
      //           icon: 'pi pi-box',
      //           routerLink: '/Database/data-satuan',
      //           expanded: this.checkActiveState('/Database/data-satuan'),
      //           styleClass: this.checkExactActiveState('/Database/data-satuan') ? "menu-active" : "",
      //         },
      //       ]
      //     },
      //     { 
      //       label: 'Data Kewarganegaraan',
      //       icon:'pi pi-flag',
      //       routerLink: '/Database/data-warga-negara',
      //       expanded: this.checkActiveState('/Database/data-warga-negara'),
      //       styleClass: this.checkExactActiveState('/Database/data-warga-negara') ? "menu-active" : "",
      //     },
      //     { 
      //       label: 'Data ICD 10',
      //       icon:'pi pi-circle-on',
      //       routerLink: '/Database/data-icd-10',
      //       expanded: this.checkActiveState('/Database/data-icd-10'),
      //       styleClass: this.checkExactActiveState('/Database/data-icd-10') ? "menu-active" : "",
      //     },
      //     { 
      //       label: 'Data Poli',
      //       icon:'pi pi-star',
      //       routerLink: '/Database/data-poli',
      //       expanded: this.checkActiveState('/Database/data-poli'),
      //       styleClass: this.checkExactActiveState('/Database/data-poli') ? "menu-active" : "",
      //     },
      //     { 
      //       label: 'Data Dokter',
      //       icon:'pi pi-sparkles',
      //       expanded: this.checkActiveState('/Database/data-dokter'),
      //       items: [
      //         { 
      //           label: 'List Dokter', 
      //           icon: 'pi pi-circle', 
      //           routerLink: '/Database/data-dokter',
      //           expanded: this.checkExactActiveState('/Database/data-dokter'),
      //           styleClass: this.checkExactActiveState('/Database/data-dokter') ? "menu-active" : "",
      //         },
      //         { 
      //           label: 'Jadwal Dokter', 
      //           icon: 'pi pi-circle', 
      //           routerLink: '/Database/data-dokter/jadwal-dokter',
      //           expanded: this.checkExactActiveState('/Database/data-dokter/jadwal-dokter'),
      //           styleClass: this.checkExactActiveState('/Database/data-dokter/jadwal-dokter') ? "menu-active" : "",
      //         },
      //         { 
      //           label: 'Cuti Dokter', 
      //           icon: 'pi pi-circle', 
      //           routerLink: '/Database/data-dokter/cuti-dokter',
      //           expanded: this.checkExactActiveState('/Database/data-dokter/cuti-dokter'),
      //           styleClass: this.checkExactActiveState('/Database/data-dokter/cuti-dokter') ? "menu-active" : "",
      //         },
      //       ]
      //     },
      //     { 
      //       label: 'Grup Penunjang',
      //       icon:'pi pi-building',
      //       routerLink: '/Database/data-grup-penunjang',
      //       expanded: this.checkActiveState('/Database/data-grup-penunjang'),
      //       styleClass: this.checkExactActiveState('/Database/data-grup-penunjang') ? "menu-active" : "",
      //     },
      //   ]
      // },
      // // {
      // //   label: 'Finances',
      // //   icon: 'pi pi-dollar',
      // //   routerLink: ['/help']
      // // },
      // {
      //   label: 'Pasien',
      //   icon: 'pi pi-users',
      //   expanded: this.checkActiveState('/Patient'),
      //   items:[
      //     { 
      //       label: 'Data Pasien', 
      //       icon: 'pi pi-circle', 
      //       routerLink: '/Patient/data-patient',
      //       expanded: this.checkActiveState('/Patient/data-patient'),
      //       styleClass: this.checkExactActiveState('/Patient/data-patient') ? "menu-active" : "",
      //     },
      //     { 
      //       label: 'Layanan Pasien', 
      //       icon: 'pi pi-circle', 
      //       routerLink: '/Patient/list-pasien-dalam-layanan',
      //       expanded: this.checkActiveState('/Patient/list-pasien-dalam-layanan'),
      //       styleClass: this.checkExactActiveState('/Patient/list-pasien-dalam-layanan') ? "menu-active" : "",  
      //     },
      //     { 
      //       label: 'Admisi Layanan', 
      //       icon: 'pi pi-circle', 
      //       routerLink: '/Patient/admisi-pasien',
      //       expanded: this.checkActiveState('/Patient/admisi-pasien'),
      //       styleClass: this.checkExactActiveState('/Patient/admisi-pasien') ? "menu-active" : "",
      //     },
      //   ]
      // },
      // {
      //   label: 'Farmasi',
      //   icon: 'pi pi-shield',
      //   expanded: this.checkActiveState('/Farmasi'),
      //   items:[
      //     { 
      //       label: 'Antrian Farmasi', 
      //       icon: 'pi pi-box', 
      //       routerLink: '/Farmasi/antrian-farmasi',
      //       expanded: this.checkActiveState('/Farmasi/antrian-farmasi'),
      //       styleClass: this.checkExactActiveState('/Farmasi/antrian-farmasi') ? "menu-active" : "",
      //     },
      //   ]
      // },
      // {
      //   label: 'Inventory',
      //   icon: 'pi pi-warehouse',
      //   items:[
      //   ]
      // },
      // {
      //   label: 'Kasir',
      //   icon: 'pi pi-receipt',
      //   items:[]
      // },
      // {
      //   label: 'Laporan',
      //   icon: 'pi pi-file',
      //   items:[
      //   ]
      // },
      // {
      //   label: 'Setting',
      //   icon: 'pi pi-cog',
      //   items: [
      //     // { label: 'Profile', icon: 'pi pi-user', routerLink: ['/profile'] },

      //     // { label: 'Security', icon: 'pi pi-lock', routerLink: ['/security'] },
      //     { 
      //       label: 'LogOut', 
      //       icon: 'pi pi-power-off',
      //       command:()=>{
      //         this.utilityService.onShowLoadingBeforeSend()
      //         setTimeout(()=>{
      //           Swal.close()
      //           this.router.navigateByUrl('')
      //         },2000)
      //       } 
      //     },
      //   ]
      // },

    ] as MenuItem[]
  }

  handleToggleSidebar(){
    if(this.menuItems.length > 0){
      this.menuItems = this.menuItems.map((item) => {
        item.expanded = false
        return item
      })
    } else {
      this.sidebarItems = this.sidebarItems.map((item) => {
        item.expanded = false
        return item
      })
    }
    this.sidebarState = !this.sidebarState
  }

  handleClickNavbar(Id:any):void{
    this.onClickButtonNav.emit(Id)
  }

  setMenu(): void {
   
    let local: any = localStorage.getItem('udahLoginNich')
   
    let data = JSON.parse(local)
   
    this.sidebarItems = data.sideBarMenu
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    // Toggle the dark mode class on the body
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }

  handleSearchMenu(e: Event){
    const inputEl = e.target as HTMLInputElement
    const query = inputEl.value.toLowerCase();

    if (!query) {
      this.menuItems = [...this.sidebarItems];     // reset ke menu asli
      return;
    }

    const filterMenuItems = (items: MenuItem[]): MenuItem[] => {
      return items
        .map((item) => {
          const isMatch = item.label?.toLowerCase().includes(query);

          if (isMatch) {

            return {
              ...item,
              expanded: true
            };
          }

          if (item.items) {
            const filteredChildren = filterMenuItems(item.items);
            if (filteredChildren.length > 0 || isMatch) {
              return {
                ...item,
                items: filteredChildren,
                expanded: true,
              };
            }
          }

          return isMatch ? { ...item } : null;
        })
        .filter((item): item is MenuItem => item !== null);
    };

    this.menuItems = filterMenuItems(this.sidebarItems);
  }

  get sidebarClass(): string {
    return `w-full sidebar ${this.sidebarState ? '' : 'minimize-sidebar'}`;
  }

  get searchClass(): string {
    return `${this.sidebarState ? 'flex' : 'hidden'} items-center flex-grow rounded-md border border-[#E4E7EC] px-[8px] py-[6px] shadow-sm`
  }
  
  get menuIconButtonClass(): string {
    return `${this.sidebarState ? '' : 'rotate-180'} pi pi-angle-double-left text-lg text-[#475467]`
  }
}

