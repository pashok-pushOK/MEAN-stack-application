import {Component, OnInit} from '@angular/core';

import {FormGroup, FormControl, FormBuilder} from "@angular/forms";

import {SearchService} from "../../service/search.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    searchForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private searchService: SearchService
    ) {
        this.searchForm = this.formBuilder.group({
            searchField: new FormControl('')
        });
    }

    onSubmit(): void {
        this.searchService.searchPost(this.searchForm.value)
            .subscribe(res => {
                console.log(res);
            });
    }

    ngOnInit() {}

}
