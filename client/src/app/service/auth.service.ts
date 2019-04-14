import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface registerResponse {
    success: boolean;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private httpClient: HttpClient
    ) {}

    registerUser(user): Observable<registerResponse> {
        return this.httpClient.post<registerResponse>(`http://localhost/authentication/register`, user)
    }

    checkUserName(username): Observable<registerResponse> {
        return this.httpClient.get<registerResponse>(`http://localhost/authentication/checkUsername/${username}`)
    }

    checkUserEmail(useremail): Observable<registerResponse> {
        return this.httpClient.get<registerResponse>(`http://localhost/authentication/checkEmail/${useremail}`)
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    isTokenExpired(): boolean {
        let token = this.getToken();
        if(token)
            return true;
        else
            return false;
    }
}
