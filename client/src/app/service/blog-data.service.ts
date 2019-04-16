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

    // blogData: BlogCard[] = [
    //     {
    //         blogId: '1er221',
    //         blogImg: 'img1.jpg',
    //         blogDatePublication: '03.12.2019',
    //         blogTitle: 'Title 1. Just checking',
    //         blogDesc: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. ',
    //         blogComments: 0,
    //         blogAuthorId: '1lew1',
    //         blogAuthorName: 'Name',
    //         blogCategory: 'Sport'
    //     },
    //     {
    //         blogId: '1er223',
    //         blogImg: 'img2.jpg',
    //         blogDatePublication: '03.12.2019',
    //         blogTitle: 'Title 2. Just checking',
    //         blogDesc: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. ',
    //         blogComments: 0,
    //         blogAuthorId: '1lew1',
    //         blogAuthorName: 'Name',
    //         blogCategory: 'Sport'
    //     },
    //     {
    //         blogId: '1er224',
    //         blogImg: 'img3.jpg',
    //         blogDatePublication: '03.12.2019',
    //         blogTitle: 'Title 3. Just checking',
    //         blogDesc: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. ',
    //         blogComments: 0,
    //         blogAuthorId: '1lew1',
    //         blogAuthorName: 'Name',
    //         blogCategory: 'Sport'
    //     },
    //     {
    //         blogId: '1er225',
    //         blogImg: 'img4.jpg',
    //         blogDatePublication: '03.12.2019',
    //         blogTitle: 'Title 4. Just checking',
    //         blogDesc: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. ',
    //         blogComments: 0,
    //         blogAuthorId: '1lew1',
    //         blogAuthorName: 'Name',
    //         blogCategory: 'Sport'
    //     },
    //     {
    //         blogId: '1er226',
    //         blogImg: 'img5.jpg',
    //         blogDatePublication: '03.12.2019',
    //         blogTitle: 'Title 5. Just checking',
    //         blogDesc: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. ',
    //         blogComments: 0,
    //         blogAuthorId: '1lew1',
    //         blogAuthorName: 'Name',
    //         blogCategory: 'Sport'
    //     }
    // ];

    blogData = [];

    public getBlogData() {
        this.getPostsData()
            .subscribe(res => {
                console.log(res);
                this.blogData.push(res.data);
            });

        return this.blogData;
    }

    public getPost(id: string): Observable<BlogCard> {
        return of(this.blogData.find(post => post.blogId === id));
    }

    formData = new FormData();

    public createPost(post): Observable<BlogCard[]> {
        for(let key in post) {
            this.formData.append(key, post[key]);
        }
        return this.http.post<BlogCard[]>(`http://localhost/blog/create-new-article`, this.formData);
    }

    public getPostsData(): Observable<posts> {
        return this.http.get<posts>(`http://localhost/blog/posts`);
    }

    constructor(
        private http: HttpClient
    ) {
    }
}
