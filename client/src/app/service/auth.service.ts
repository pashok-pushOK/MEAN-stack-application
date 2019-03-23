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

    checkUserName(user): Observable<registerResponse> {
        return this.httpClient.post<registerResponse>(`http://localhost/checkUsername/${user.userName}`, user)
    }

    checkUserEmail(user): Observable<registerResponse> {
        return this.httpClient.post<registerResponse>(`http://localhost/checkEmail/${user.userEmail}`, user);
    }
}
