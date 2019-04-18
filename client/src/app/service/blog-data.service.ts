import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {BlogCard} from "../blog-card";
import {HttpClient} from "@angular/common/http";

export interface posts {
    data: object;
}

@Injectable({
    providedIn: 'root'
})
export class BlogDataService {

    constructor(
        private http: HttpClient
    ) {
    }

    blogData: any;
    formData = new FormData();

    public getBlogData() {
        this.getPostsData()
            .subscribe(res => {
                this.blogData = res.data;
            });

        return this.blogData;
    }

    public getPost(id: string): Observable<BlogCard> {
        return of(this.blogData.find(post => post._id === id));
    }

    public createPost(post): Observable<posts> {
        for(let key in post) {
            this.formData.append(key, post[key]);
        }
        return this.http.post<posts>('http://localhost:8080/blog/createNewArticle', this.formData);
    }

    public getPostsData(): Observable<posts> {
        return this.http.get<posts>(`http://localhost:8080/blog/posts`);
    }
}
