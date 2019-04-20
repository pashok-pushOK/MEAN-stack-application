import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {ImageService} from "../../service/image.service";
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

    // user data variables
    userName: string;
    userEmail: string;
    userCity: string;
    userAdress: string;
    userId: string;
    userPhoto: string;

    // variables for image uploading
    isUploaded: boolean = false;
    selectedFile: ImageSnippet;
    form: FormGroup;

    constructor(
        private loginService: LoginService,
        private imageService: ImageService,
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group({
            avatar: new FormControl('')
        });
    }

    // method for resetting photo if user clicks button -> reset
    private defaultPhoto(): void {
        this.selectedFile.src = '';
        this.isUploaded = false;
    }

    // method for uploading a new image
    processFile(imageInput: any) {
        if(imageInput.files[0] || imageInput.files) {
            let reader = new FileReader();

            reader.onload = (event: any) => {
                this.selectedFile = new ImageSnippet(event.target.result, imageInput.files[0]);
                this.isUploaded = true;
            };

            if(imageInput.files[0]) {
                reader.readAsDataURL(imageInput.files[0]);
            }
        } else {
            this.isUploaded = false;
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
                        this.userPhoto = data.userPhoto;
                    });
            });

        console.log(this.userPhoto);
        console.log(this.userId);
    }

}
