import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../service/login.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    userName;
    userEmail;
    userCity;
    userAdress;

    constructor(
        private loginService: LoginService
    ) {
    }

    ngOnInit() {
        this.loginService.getUserProfile()
            .subscribe(profile => {
                console.info(profile);

                this.userName = profile.user.userName;
                this.userEmail = profile.user.userEmail;
                this.userCity = profile.user.userCity;
                this.userAdress = profile.user.userAdress;
            });
    }

    logOut() {
        this.loginService.logOut();
    }

}
