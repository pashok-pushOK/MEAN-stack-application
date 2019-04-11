import {Injectable, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {FlashMessageService} from "./flash-message.service";

export interface loginInterface {
    success: boolean;
    message: string;
    token: string;
    user: {
        userAdress: string,
        userId: string,
        userName: string,
        userEmail: string,
        userCity: string,
        _id: string
    }
}

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    authToken;
    authUser;
    options;
    isVisible: boolean;

    constructor(
        private http: HttpClient,
        private router: Router,
        private flashMessageService: FlashMessageService
    ) {
    }

    ngOnInit() {
    }

    login(user): Observable<loginInterface> {
        return this.http.post<loginInterface>('http://localhost/authentication/login', user);
    }

    logOut() {
        this.authUser = null;
        this.authToken = null;
        localStorage.clear();
        this.isVisible = false;
        this.router.navigate(['/home'])
            .then(_ => {
                this.flashMessageService.generateFlashMessage('You have just logged out!', this.isVisible);
            });
    }

    storeUserData(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.authUser = user;
    }

    createAuthenticationHeaders() {
        this.loadToken();

        this.options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'auth_token': this.authToken,
            })
        }
    }

    loadToken() {
        this.authToken = localStorage.getItem('token');
        this.authUser = JSON.parse(localStorage.getItem('user'));
    }

    getUserProfile(): Observable<loginInterface> {
        this.createAuthenticationHeaders();
        return this.http.get<loginInterface>(`http://localhost/authentication/profile`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'auth_token': this.authToken,
            })
        });
    }
}
