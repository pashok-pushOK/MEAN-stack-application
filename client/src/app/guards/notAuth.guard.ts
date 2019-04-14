import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {AuthService} from "../service/auth.service";

@Injectable({
    providedIn: 'root',
})
export class NotAuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(): boolean {
        // if(this.authService.isTokenExpired()) {
        //     this.router.navigateByUrl('/home');
        //     return true;
        // } else {
        //     this.router.navigateByUrl('/register');
        //     return false;
        // }
        return
    }
}
