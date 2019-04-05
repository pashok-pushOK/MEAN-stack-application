import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FlashMessageService {

    public output: string;

    public generateFlashMessage(message: string, isVisible: boolean = true) {
        return this.output = message;
    }

    constructor() {
    }
}
