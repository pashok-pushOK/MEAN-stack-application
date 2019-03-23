import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../service/auth.service";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    form: FormGroup;
    submitted = false;
    message: string;
    messageClass: string;
    emailMessage: string;
    userNameMessage: string;

    validateUserName(control) {
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        if (regExp.test(control.value)) {
            return null;
        } else {
            return {'validateUserName': true};
        }
    }

    validateUserEmail(control) {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (regExp.test(control.value)) {
            return null;
        } else {
            return {'validateUserEmail': true};
        }
    };

    validateUserPassword(control) {
        const regExp = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
        if (regExp.test(control.value)) {
            return null;
        } else {
            return {'validateUserPassword': true};
        }
    };

    validateUserCity(control) {
        const regExp = new RegExp(/^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/);
        if (regExp.test(control.value)) {
            return null;
        } else {
            return {'validateUserCity': true};
        }
    };

    createForm() {
        this.form = this.formBuilder.group({
            userName: ['',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(20),
                    this.validateUserName
                ])
            ],
            userPassword: ['', Validators.compose([
                Validators.required,
                this.validateUserPassword
            ])],
            userRepeatPassword: ['', Validators.required],
            userEmail: ['', Validators.compose([
                Validators.required,
                this.validateUserEmail
            ])],
            userCity: ['', Validators.compose([
                Validators.required,
                this.validateUserCity
            ])],
            userAdress: ''
        }, {validator: this.matchingPasswords('userPassword', 'userRepeatPassword')});
    }

    matchingPasswords(pass, confirm) {
        return (group: FormGroup) => {
            if (group.controls[pass].value === group.controls[confirm].value) {
                return null;
            } else {
                return {'matchingPasswords': true};
            }
        }
    }

    onSubmit() {
        this.submitted = true;
        const user = {
            userName: this.form.get('userName').value,
            userEmail: this.form.get('userEmail').value,
            userPassword: this.form.get('userPassword').value,
            userCity: this.form.get('userCity').value,
            userAdress: this.form.get('userAdress').value
        };
        this.authService.registerUser(user)
            .subscribe(res => {
                if (res.success) {
                    this.message = res.message;
                    this.messageClass = 'alert-success show'
                    this.form.reset();
                } else {
                    this.message = res.message;
                    this.messageClass = 'alert-danger show';
                }
            });
    }

    checkEmail() {
        this.authService.checkUserEmail(this.form.get('userEmail').value)
            .subscribe(data => {
                if(data.success) this.emailMessage = data.message;
                else this.emailMessage = data.message;
            });
    }

    checkUsername() {
        this.authService.checkUserName(this.form.get('userName').value)
            .subscribe(data => {
                if(data.success) this.userNameMessage = data.message;
                else this.userNameMessage = data.message;
            });
    }

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.createForm();
    }

}
