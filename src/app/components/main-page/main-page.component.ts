import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface UrlParams {
    search: string;
    page: number;
    category: string;
}

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
    public searchInput: string;
    public page: number;
    public category: string;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private location: Location) {}

    ngOnInit(): void {
        this.searchInput = this.activatedRoute.snapshot.queryParamMap.get('search');
        const page = parseInt(this.activatedRoute.snapshot.queryParamMap.get('page'), 10) || 1;
        this.page = page - 1;
        this.category = this.activatedRoute.snapshot.queryParamMap.get('category');
    }

    onFilter(filters: UrlParams) {
        if (filters.search === '') {
            filters.search = undefined;
        }
        const url = this.router.createUrlTree([], { relativeTo: this.activatedRoute, queryParams: filters }).toString();
        this.location.go(url);
    }
}
