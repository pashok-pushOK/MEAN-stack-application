import {Component, OnInit} from '@angular/core';
import {BlogDataService} from "../../service/blog-data.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    blogCards = [];

    constructor(
        private blogDataService: BlogDataService
    ) {
    }

    getBlogData() {
        this.blogCards = this.blogDataService.getBlogData();
    }

    ngOnInit() {
        this.getBlogData();
    }

}
