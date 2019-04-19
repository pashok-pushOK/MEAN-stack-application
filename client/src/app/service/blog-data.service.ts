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

    blogData: any = [];
    formData = new FormData();

    public getPost(id: string): Observable<BlogCard> {
        this.getPostsData()
            .subscribe(
                res => this.blogData = res.data,
                err => console.log(err),
                () => {
                    console.log(new Date(), ' completed');
                }
            );

        console.log('-- ', new Date(), this.blogData);

        return of(this.blogData.find(post => post._id === id));
    }

    public getPostsData(): Observable<posts> {
        return this.http.get<posts>(`http://localhost:8080/blog/posts`);
    }

    public createPost(post): Observable<posts> {
        for(let key in post) {
            this.formData.append(key, post[key]);
        }
        return this.http.post<posts>('http://localhost:8080/blog/createNewArticle', this.formData);
    }
}
