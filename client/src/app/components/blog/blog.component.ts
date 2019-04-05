import {Component, OnInit} from '@angular/core';
import {BlogDataService} from "../../service/blog-data.service";

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

    blogCardsArr = [];

    constructor(
        private blogDataService: BlogDataService
    ) {

    }

    getBlogData() {
        this.blogCardsArr = this.blogDataService.getBlogData();
    }

    ngOnInit() {
        this.getBlogData();
    }

}
