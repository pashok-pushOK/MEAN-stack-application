import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface image {
    success: boolean;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    constructor(
        private http: HttpClient
    ) {
    }

    uploadImage(image): Observable<image> {
        const formData = new FormData();

        formData.append('image', image);

        return this.http.post<image>('http://localhost/profile/changeImage', formData);
    }
}
