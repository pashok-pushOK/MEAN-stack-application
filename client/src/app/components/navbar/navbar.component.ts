import {Component, OnInit} from '@angular/core';
import {Router, Event, NavigationStart, NavigationEnd, NavigationError} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import {NotAuthGuard} from "../../guards/notAuth.guard";
import {LoginService} from "../../service/login.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    public activeRoute;
    public profileName: string = localStorage.getItem('userName') || '';

    constructor(
        private router: Router,
        public route: ActivatedRoute,
        private notAuthGuard: NotAuthGuard,
        private loginService: LoginService
    ) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                // Show loading indicator
                this.activeRoute = event.url;
            }
        //
        //     if (event instanceof NavigationEnd) {
        //         // Hide loading indicator
        //     }
        //
        //     if (event instanceof NavigationError) {
        //         // Hide loading indicator
        //
        //         // Present error to user
        //         // console.log(event.error);
        //     }
        });
    }

    public isLoggedIn: boolean = this.notAuthGuard.canActivate();

    public logOut(): void {
        this.loginService.logOut();
    }

    ngOnInit() {
    }
}
