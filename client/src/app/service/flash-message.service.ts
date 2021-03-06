import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material";

@Injectable({
    providedIn: 'root'
})
export class FlashMessageService {

    public durationInSeconds: number = 4;

    openSnackBar(message) {
        this.snackBar.open(message, '', {
            duration: this.durationInSeconds * 1000,
            panelClass: 'text-center text-white'
        });
    }

    constructor(
        private snackBar: MatSnackBar
    ) {
    }
}
