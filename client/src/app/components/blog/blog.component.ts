import {Component, OnInit} from '@angular/core';
import {BlogDataService} from "../../service/blog-data.service";
import {LoginService} from "../../service/login.service";
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
    userName: string;
    // userId: string;

    formToggler: boolean = false;

    image: HTMLImageElement;
    blogCardsArr: any;

    // variables for creating a new blog post
    selectedPostFile: ImageSnippet;
    blogPostForm: FormGroup;

    // autocomplete filed options
    options: string[] = ['Beauty', 'Love', 'Sport', 'Nature', 'Adventure'];

    constructor(
        private blogDataService: BlogDataService,
        private formBuilder: FormBuilder
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

    getLocalStorageItem(itemName): string {
        let item = localStorage.getItem(itemName);
        if(item !== null || item !== undefined || item !== '') {
            return item;
        }
    }

    // method for submitting user created blog post
    public submitBlogPostForm() {
        // window.location.reload();
        this.userName = this.getLocalStorageItem('userName');

        const postObject = {
            blogInputCategory: this.blogPostForm.get('blogInputCategory').value,
            blogInputTitle: this.blogPostForm.get('blogInputTitle').value,
            blogInputText: this.blogPostForm.get('blogInputText').value,
            blogInputImage: this.selectedPostFile.file,
            blogDatePublication: new Date().toLocaleDateString(),
            // blogAuthorName: this.userName
        };

        this.blogDataService.createPost(postObject)
            .subscribe(res => {
                console.log(res);
            })
    }

    // show/hide form
    toggleForm(): void {
        this.formToggler = !this.formToggler;
    }

    // get posts with service
    getBlogData() {
        this.blogDataService.getPostsData()
            .subscribe(res => {
                this.blogCardsArr = res.data;
            });
    }

    ngOnInit() {
        this.getBlogData();
    }

}
