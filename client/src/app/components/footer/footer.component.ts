import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {group} from "@angular/animations";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    form: FormGroup;
    submitted = false;

    validateUserName(control) {
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        if(regExp.test(control.value)) {
            return null;
        } else {
            return {'validateUserName': true};
        }
    }

    validateUserEmail(control) {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if(regExp.test(control.value)) {
            return null;
        } else {
            return {'validateUserEmail': true};
        }
    };

    validateUserPassword(control) {
        const regExp = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
        if(regExp.test(control.value)) {
            return null;
        } else {
            return {'validateUserPassword': true};
        }
    };

    validateUserCity(control) {
        const regExp = new RegExp(/^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/);
        if(regExp.test(control.value)) {
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
            if(group.controls[pass].value === group.controls[confirm].value) {
                return null;
            } else {
                return {'matchingPasswords': true};
            }
        }
    }

    onSubmit() {
        this.submitted = true;
        console.log(`The form has been submitted!`);
    }

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.createForm();
    }

}
