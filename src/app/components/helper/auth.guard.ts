import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";


@Injectable({ providedIn: 'root' })
export class AuthGuard  {

    constructor(private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let userData = localStorage.getItem('udahLoginNich')
        if (userData) {
            return true
        }
        this.router.navigateByUrl('')
        return true

    }
}