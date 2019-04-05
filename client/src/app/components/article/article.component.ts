import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {BlogDataService} from "../../service/blog-data.service";
import {BlogCard} from "../../blog-card";

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
    post: BlogCard;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private blogDataService: BlogDataService
    ) {
    }

    ngOnInit() {
        this.getPost();
    }

    getPost(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.blogDataService.getPost(id)
            .subscribe(post => this.post = post);
    }

}
