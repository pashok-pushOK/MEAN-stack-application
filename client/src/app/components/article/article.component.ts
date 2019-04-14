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

    getPost(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.blogDataService.getPost(id)
            .subscribe(post => {
                this.post = post;

                // i don't know why page scroll to bottom when browser goes to /blog/post/:id
                // so I decided to use next line, but I don't like this
                window.scrollTo(0, 0);
            });
    }

    ngOnInit() {
        this.getPost();
    }
}