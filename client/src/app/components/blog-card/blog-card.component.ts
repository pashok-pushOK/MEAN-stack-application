import {Component, Input, OnInit} from '@angular/core';
import {BlogCard} from "../../blog-card";

@Component({
    selector: 'app-blog-card',
    templateUrl: './blog-card.component.html',
    styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {
    @Input() blogCard: BlogCard;

    constructor() {}

    ngOnInit() {}

}
