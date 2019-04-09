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
    isUploaded: boolean;
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

    private onSuccess(): void {
        this.pending = false;
        this.status = 'ok';
    }

    private onError(): void {
        this.pending = false;
        this.status = 'fail';
        this.selectedFile.src = '';
    }

    processFile(imageInput: any) {
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', (event: any) => {
            this.selectedFile = new ImageSnippet(event.target.result, file);
            this.pending = true;
            this.isUploaded = true;
        });

        reader.readAsDataURL(file);
    }

    submitForm() {
        this.imageService.uploadImage(this.selectedFile.file)
            .subscribe( data => {
                if(data.success)
                    this.status = 'ok';
                else
                    this.status = 'fail';
            });
    }

    ngOnInit() {
        this.loginService.getUserProfile()
            .subscribe(profile => {
                this.userName = profile.user.userName;
                this.userEmail = profile.user.userEmail;
                this.userCity = profile.user.userCity;
                this.userAdress = profile.user.userAdress;
            });
    }

    logOut() {
        this.loginService.logOut();
    }

}
