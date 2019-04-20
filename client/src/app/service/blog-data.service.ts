import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {BlogCard} from "../blog-card";
import {HttpClient} from "@angular/common/http";

export interface posts {
    success: boolean;
    data: {
        _id: string;
    }
}

@Injectable({
    providedIn: 'root'
})
export class BlogDataService {

    blogData: object;
    formData = new FormData();

    constructor(
        private http: HttpClient
    ) {
    }

    public getPost(id: string) {
        return this.http.get<posts>(`http://localhost/blog/post/${id}`)
    }

    public getPostsData() {
        return this.http.get<posts>(`http://localhost/blog/posts`)
    }

    public createPost(post): Observable<BlogCard> {
        for (let key in post) {
            this.formData.append(key, post[key]);
        }
        return this.http.post<BlogCard>('http://localhost/blog/createNewArticle', this.formData);
    }
}
