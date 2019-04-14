import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

import {FlashMessageService} from "../service/flash-message.service";
import {AuthService} from "../service/auth.service";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private flashMessageService: FlashMessageService,
        private router: Router
    ) {}

    // method for checking if the user logged in or not, << boolean >> returns true or false
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        // if false redirect to login page
        if(!this.authService.isTokenExpired()) {
            this.router.navigateByUrl('/login');
            this.flashMessageService.openSnackBar(`You must be logged in to view this page ${state.url}`);
        }
        return this.authService.isTokenExpired();
    }
}
