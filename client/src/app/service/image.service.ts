import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    constructor(
        private http: HttpClient
    ) {
    }

    uploadImage(image) {
        const formData = new FormData();

        formData.append('image', image);

        return this.http.post('http://localhost/profile/changeImage', formData, {responseType: 'text'});
    }
}
