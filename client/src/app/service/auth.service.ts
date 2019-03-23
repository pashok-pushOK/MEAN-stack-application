import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private httpClient: HttpClient
    ) {}

    registerUser(user) {
        return this.httpClient.post(`http://localhost/authentication/register`, user)
            .subscribe(res => console.log(res));
    }
}
