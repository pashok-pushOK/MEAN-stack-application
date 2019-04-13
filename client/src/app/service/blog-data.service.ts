import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {BlogCard} from "../blog-card";

@Injectable({
    providedIn: 'root'
})
export class BlogDataService {

    blogData: BlogCard[] = [
        {
            blogId: '1er221',
            blogImg: 'img1.jpg',
            blogDatePublication: '03.12.2019',
            blogTitle: 'Title 1. Just checking',
            blogDesc: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. ',
            blogComments: 0
        },
        {
            blogId: '1er223',
            blogImg: 'img2.jpg',
            blogDatePublication: '03.12.2019',
            blogTitle: 'Title 2. Just checking',
            blogDesc: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. ',
            blogComments: 0
        },
        {
            blogId: '1er224',
            blogImg: 'img3.jpg',
            blogDatePublication: '03.12.2019',
            blogTitle: 'Title 3. Just checking',
            blogDesc: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. ',
            blogComments: 0
        },
        {
            blogId: '1er225',
            blogImg: 'img4.jpg',
            blogDatePublication: '03.12.2019',
            blogTitle: 'Title 4. Just checking',
            blogDesc: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. ',
            blogComments: 0
        },
        {
            blogId: '1er226',
            blogImg: 'img5.jpg',
            blogDatePublication: '03.12.2019',
            blogTitle: 'Title 5. Just checking',
            blogDesc: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. ',
            blogComments: 0
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
