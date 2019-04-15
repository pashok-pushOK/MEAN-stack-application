import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {ImageService} from "../../service/image.service";
import {PostsService} from "../../service/posts.service";
import {
    FormBuilder,
    FormGroup,
    FormControl
} from "@angular/forms";

class ImageSnippet {
    constructor(
        public src: string,
        public file: File
    ) {
    }
}

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    image: HTMLImageElement;

    // user data variables
    userName;
    userEmail;
    userCity;
    userAdress;
    userId;
    userPhoto: string;

    // variables for image uploading
    isUploaded: boolean = false;
    pending: boolean = false;
    status: string = 'init';
    selectedFile: ImageSnippet;
    form: FormGroup;

    // variables for creating a new blog post
    selectedPostFile: ImageSnippet;
    blogPostForm: FormGroup;

    // autocomplete filed options
    options: string[] = ['Beauty', 'Love', 'Sport', 'Nature', 'Adventure'];

    constructor(
        private loginService: LoginService,
        private imageService: ImageService,
        private formBuilder: FormBuilder,
        private postService: PostsService
    ) {
        this.form = this.formBuilder.group({
            avatar: new FormControl('')
        });

        // Create blog post form group on page loads
        this.blogPostForm = this.formBuilder.group({
            blogInputCategory: new FormControl(''),
            blogInputTitle: new FormControl(''),
            blogInputText: new FormControl(''),
            blogInputImage: new FormControl('')
        });
    }

    // method for resetting photo if user clicks button -> reset
    private defaultPhoto(): void {
        this.selectedFile.src = '';
        this.isUploaded = false;
        this.pending = false;
    }

    // method for uploading a new image
    processFile(imageInput: any) {
        if(imageInput.files[0] || imageInput.files) {
            let reader = new FileReader();

            reader.onload = (event: any) => {
                this.selectedFile = new ImageSnippet(event.target.result, imageInput.files[0]);
                this.pending = false;
                this.isUploaded = true;
            };

            reader.readAsDataURL(imageInput.files[0]);
        } else {
            this.isUploaded = false;
            this.pending = false;
            this.status = 'exit';
        }
    }

    // method for submitting user photo form
    submitForm() {
        const obj = {
            image: this.selectedFile.file,
            userId: this.userId,
            userName: this.userName
        };

        if(!this.userPhoto) {
            this.imageService.uploadImage(obj)
                .subscribe(data => {
                    console.info(data);
                });
        } else {
            this.imageService.updateUserPhoto(obj)
                .subscribe(data => {
                    console.log(data);
                });
        }
    }

    logOut() {
        this.loginService.logOut();
    }

    // method for toggling tabs
    toggleTabs(event, label): void {
        let i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName('form-tabs--item_content');
        tablinks = document.getElementsByClassName('tab-button');
        for(i = 0; i < tabcontent.length; i++) {
            tabcontent[i].classList.remove('active');
            tablinks[i].className = tablinks[i].className.replace('active', '');
        }
        document.getElementById(label).classList.add('active');
        event.currentTarget.classList.add('active');
    }

    uploadPostImage(postImageInput: any): void {
        if(postImageInput.files || postImageInput.files[0]) {
            let postImageUploadView = document.getElementById('postImageUploadView');
            const reader = new FileReader();

            reader.onload = (event: any) => {
                this.selectedPostFile = new ImageSnippet(event.target.result, postImageInput.files[0]);

                this.image = document.createElement('img');
                this.image.src = this.selectedPostFile.src;
                this.image.width = 200;
                postImageUploadView.appendChild(this.image);
            };

            reader.readAsDataURL(postImageInput.files[0]);
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

    ngOnInit() {
        this.loginService.getUserProfile()
            .subscribe(profile => {
                this.userName = profile.user.userName;
                this.userEmail = profile.user.userEmail;
                this.userCity = profile.user.userCity;
                this.userAdress = profile.user.userAdress;
                this.userId = profile.user._id;

                this.imageService.getUserPhoto(this.userName, this.userId)
                    .subscribe(data => {
                        this.userPhoto = `assets/uploads/avatars/${data.userPhoto}`;
                    });
            });
    }

}
