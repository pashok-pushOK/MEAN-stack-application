import {Component, OnInit} from '@angular/core';
import {FlashMessageService} from "../../service/flash-message.service";
import {LoginService} from "../../service/login.service";

@Component({
    selector: 'app-flash-message',
    templateUrl: './flash-message.component.html',
    styleUrls: ['./flash-message.component.css']
})
export class FlashMessageComponent implements OnInit {

    isVisible;
    message: string;

    constructor(
        private flashMessageService: FlashMessageService,
        private loginService: LoginService
    ) {
    }

    ngOnInit() {
        if (this.flashMessageService.output) {
            this.message = this.flashMessageService.output;
            this.isVisible = true;

            setTimeout(_ => {
                this.isVisible = this.loginService.isVisible;
                console.info(this.flashMessageService.output, this.isVisible, this.loginService.isVisible);
            }, 2000);
        }
    }

}
