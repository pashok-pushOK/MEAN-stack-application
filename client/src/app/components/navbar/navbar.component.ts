import {Component, OnInit} from '@angular/core';
import {Router, Event, NavigationStart, NavigationEnd, NavigationError} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import {LoginService} from "../../service/login.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    public activeRoute;

    constructor(
        private router: Router,
        public route: ActivatedRoute,
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

    ngOnInit() {
    }
}
