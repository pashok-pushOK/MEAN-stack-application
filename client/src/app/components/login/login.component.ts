import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {LoginService} from "../../service/login.service";
import {FlashMessageService} from "../../service/flash-message.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public formLogin: FormGroup;
    public responseStatus: boolean;
    public responseMessage: string;
    public alertClass: string;

    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private router: Router,
        private flashMessageService: FlashMessageService
    ) {
        this.formLogin = this.formBuilder.group({
            userName: new FormControl(''),
            userPassword: new FormControl('')
        });
    }

    ngOnInit() {
    }

    onSubmit() {
        this.loginService.login(this.formLogin.value)
            .subscribe(data => {
                this.responseStatus = data.success;
                this.responseMessage = data.message;
                if (!data.success) {
                    this.alertClass = 'alert-danger';
                } else {
                    this.loginService.storeUserData(data.token, data.user);
                    this.router.navigate([`/profile/${data.user.userName}`]);
                    this.flashMessageService.openSnackBar('You have just logged in!');
                }
            });
    }

}
