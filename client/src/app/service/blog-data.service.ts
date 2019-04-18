import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {BlogCard} from "../blog-card";
import {HttpClient} from "@angular/common/http";
import {catchError, map, tap} from 'rxjs/operators';

export interface posts {
    data: object;
}

@Injectable({
    providedIn: 'root'
})
export class BlogDataService {

    blogData: any = this.getPostsData()
        .subscribe(res => {
        this.blogData = res.data;
    });
    formData = new FormData();

    constructor(
        private http: HttpClient
    ) {
    }

    public getPost(id: string): Observable<BlogCard> {
        return of(this.blogData.find(post => post._id === id));
    }

    public getPostsData() {
        return this.http.get<posts>(`http://localhost/blog/posts`)
    }

    public createPost(post): Observable<posts> {
        for (let key in post) {
            this.formData.append(key, post[key]);
        }
        return this.http.post<posts>('http://localhost/blog/createNewArticle', this.formData);
    }
}
