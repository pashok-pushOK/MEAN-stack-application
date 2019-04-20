import {Component, OnInit, Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {BlogDataService} from "../../service/blog-data.service";

@Injectable()
export class PostResolver implements Resolve<any> {
    constructor(
        private backend: BlogDataService
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {
        return this.backend.getPost(route.params.id);
    }
}
@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

    post: any;
    isLoadedData: boolean = false;

    constructor(
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        // get data from resolver
        this.post = this.route.snapshot.data.post.data;
        this.isLoadedData = this.route.snapshot.data.post.success;

        // when routes to blog/post/:id -> window scrolls to bottom, I don't know why
        window.scrollTo(0, 0);
    }
}
