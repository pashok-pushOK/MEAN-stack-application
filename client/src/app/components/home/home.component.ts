import {Component, OnInit} from '@angular/core';
import {BlogCard} from "../../blog-card";
import {BlogDataService} from "../../blog-data.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    blogCardsArr = [];

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

    constructor(private blogDataService: BlogDataService) {}

    getBlogData() {
        this.blogCardsArr = this.blogDataService.getBlogData();
    }

    ngOnInit() {
        this.getBlogData();
    }

}
