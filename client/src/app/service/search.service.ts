import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {posts} from "./blog-data.service";

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    constructor(
        private http: HttpClient
    ) {
    }

    searchPost(post): Observable<posts> {
        return this.http.get<posts>(`http://localhost/search/${post}`);
    }
}
