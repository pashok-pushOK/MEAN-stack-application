import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    componentTexts = [
        {
            componentTitle: 'MEAN Stack Application',
            componentDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, parturient montes, nascetur ridiculus mus.'
        },
        {
            componentTitle: 'Slide 2. MEAN Stack Application Again.',
            componentDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
    ];

    constructor() {
    }

    ngOnInit() {
    }

}
