import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {BlogCard} from "../blog-card";

@Injectable({
    providedIn: 'root'
})
export class BlogDataService {

    blogData: BlogCard[] = [
        {
            blogId: '1er221', blogImg: 'img1.jpg', blogTitle: 'Title 1. Just checking',
            blogDesc: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. '
        },
        {
            blogId: '1er223', blogImg: 'img2.jpg', blogTitle: 'Title 2. Just checking',
            blogDesc: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. '
        },
        {
            blogId: '1er224', blogImg: 'img3.jpg', blogTitle: 'Title 3. Just checking',
            blogDesc: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. '
        },
        {
            blogId: '1er225', blogImg: 'img4.jpg', blogTitle: 'Title 4. Just checking',
            blogDesc: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. '
        },
        {
            blogId: '1er226', blogImg: 'img5.jpg', blogTitle: 'Title 5. Just checking',
            blogDesc: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. '
        }
    ];

    getBlogData() {
        return this.blogData;
    }

    getPost(id: string): Observable<BlogCard> {
        return of(this.blogData.find(post => post.blogId === id));
    }

    constructor() {
    }
}
