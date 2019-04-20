export class BlogCard {
    blogCategory: string;
    _id: string;
    blogImg: string;
    blogTitle: string;
    blogDesc: string;
    blogDatePublication: string;
    blogComments: number;
    // blogAuthorId: string;
    blogAuthorName: {
        type: string,
        default: 'Guest'
    }
}
