import {Component, OnInit} from '@angular/core';
import {BlogDataService} from "../../service/blog-data.service";
import {PostsService} from "../../service/posts.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

class ImageSnippet {
    constructor(
        public src: string,
        public file: File
    ) {
    }
}

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

    // user data variables
    userName;
    userEmail;
    userCity;
    userAdress;
    userId;

    image: HTMLImageElement;
    blogCardsArr = [];

    // variables for creating a new blog post
    selectedPostFile: ImageSnippet;
    blogPostForm: FormGroup;

    // autocomplete filed options
    options: string[] = ['Beauty', 'Love', 'Sport', 'Nature', 'Adventure'];

    constructor(
        private blogDataService: BlogDataService,
        private formBuilder: FormBuilder,
        private postService: PostsService
    ) {
        // Create blog post form group on page loads
        this.blogPostForm = this.formBuilder.group({
            blogInputCategory: new FormControl(''),
            blogInputTitle: new FormControl(''),
            blogInputText: new FormControl(''),
            blogInputImage: new FormControl('')
        });
    }

    uploadPostImage(postImageInput: any): void {
        if (postImageInput.files || postImageInput.files[0]) {
            let postImageUploadView = document.getElementById('postImageUploadView');
            const reader = new FileReader();

            reader.onload = (event: any) => {
                this.selectedPostFile = new ImageSnippet(event.target.result, postImageInput.files[0]);

                this.image = document.createElement('img');
                this.image.src = this.selectedPostFile.src;
                this.image.width = 200;
                postImageUploadView.innerHTML = '';
                postImageUploadView.appendChild(this.image);
            };

            if (postImageInput.files[0]) {
                reader.readAsDataURL(postImageInput.files[0]);
            }
        }
    }

    // method for submitting user created blog post
    public submitBlogPostForm() {
        const postObject = {
            blogInputCategory: this.blogPostForm.get('blogInputCategory').value,
            blogInputTitle: this.blogPostForm.get('blogInputTitle').value,
            blogInputText: this.blogPostForm.get('blogInputText').value,
            blogInputImage: this.selectedPostFile.file,
            blogDatePublication: new Date().toLocaleDateString(),
            blogAuthorId: this.userId,
            blogAuthorName: this.userName
        };

        this.postService.createPost(postObject)
            .subscribe(res => {
                console.log(res);
            })
    }

    // get posts with service
    getBlogData() {
        this.blogCardsArr = this.blogDataService.getBlogData();
    }

    ngOnInit() {
        this.getBlogData();
    }

}
