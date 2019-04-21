import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface image {
    success: boolean;
    message: string;
    userId: string;
    userPhoto: string;
    userName: string;
}

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    formData = new FormData();

    constructor(
        private http: HttpClient
    ) {
    }

    uploadImage(image): Observable<image> {
        this.formData.append('image', image.image);
        this.formData.append('userId', image.userId);
        return this.http.post<image>(`http://localhost/profile/changeImage`, this.formData);
    }

    getUserPhoto(name, id): Observable<image> {
        return this.http.post<image>(`http://localhost/profile/${name}/${id}`, name);
    }

    updateUserPhoto(files): Observable<image> {
        this.formData.append('image', files.image);
        this.formData.append('userId', files.userId);
        this.formData.append('userName', files.userName);
        return this.http.post<image>(`http://localhost/profile/updatePhoto/${this.formData.get('userName')}`, this.formData);
    }
}
