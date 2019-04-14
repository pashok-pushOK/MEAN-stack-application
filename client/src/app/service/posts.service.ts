import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BlogCard} from "../blog-card";

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    formData = new FormData();

    public createPost(post): Observable<BlogCard[]> {
        for(let key in post) {
            this.formData.append(key, post[key]);
        }
        return this.http.post<BlogCard[]>(`http://localhost/profile/${post.blogAuthorName}/create-new-article`, this.formData);
    }

    constructor(
        private http: HttpClient
    ) {
    }
}
