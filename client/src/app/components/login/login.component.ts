import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {LoginService} from "../../service/login.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public formLogin: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService
    ) {
        this.formLogin = this.formBuilder.group({
            userName: new FormControl(''),
            userPassword: new FormControl('')
        });
    }

    ngOnInit() {
    }

    onSubmit() {
        this.loginService.getLoginResponse(this.formLogin.value)
            .subscribe(res => {
                console.log(res);
            })
    }

}
