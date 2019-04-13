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

    userName;
    userEmail;
    userCity;
    userAdress;
    userId;
    userPhoto: string;

    isUploaded: boolean = false;
    pending: boolean = false;
    status: string = 'init';
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

    private defaultPhoto(): void {
        this.selectedFile.src = '';
        this.isUploaded = false;
        this.pending = false;
    }

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
