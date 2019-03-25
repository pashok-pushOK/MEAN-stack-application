import {Injectable, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

export interface loginInterface {
    success: boolean;
    message: string;
    obj: any;
}

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
    }

    getLoginResponse(user): Observable<loginInterface> {
        return this.http.post<loginInterface>('http://localhost/authentication/login', user);
    }
}
