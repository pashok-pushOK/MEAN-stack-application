import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BlogDataService {
    blogData = [
        {
            blogId: '1er221',
            blogImg: 'img1.jpg',
            blogTitle: 'Title 1. Just checking',
            blogDesc: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. '
        },
        {
            blogId: '1er223',
            blogImg: 'img2.jpg',
            blogTitle: 'Title 2. Just checking',
            blogDesc: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. '
        },
        {
            blogId: '1er224',
            blogImg: 'img3.jpg',
            blogTitle: 'Title 3. Just checking',
            blogDesc: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. '
        },
        {
            blogId: '1er225',
            blogImg: 'img4.jpg',
            blogTitle: 'Title 4. Just checking',
            blogDesc: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. '
        },
        {
            blogId: '1er226',
            blogImg: 'img5.jpg',
            blogTitle: 'Title 5. Just checking',
            blogDesc: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. '
        }
    ];

    getBlogData() {
        return this.blogData;
    }

    constructor() {
    }
}
