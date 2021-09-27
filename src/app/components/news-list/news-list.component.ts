import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NewsService, NewsSource } from '../../services/news.service';
import { PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UrlParams } from '../main-page/main-page.component';

@Component({
    selector: 'app-news-list',
    templateUrl: './news-list.component.html',
    styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit, OnDestroy {
    @Input() searchInput: string;
    @Input() selectedCategory: string;
    @Input() pageIndex: number;

    @Output() listFiltered = new EventEmitter<UrlParams>();

    public newsSources: NewsSource[];
    public pageNewsSources: NewsSource[]; // news sources of the visible page
    public totalNews = 0;
    public categories: string[];

    public readonly pageSize = 6;

    public readonly searchFormControl = new FormControl();
    public readonly categoryFormControl = new FormControl();

    private onSearchSub: Subscription;
    private onSelectCategorySub: Subscription;

    constructor(private newsService: NewsService) {}

    ngOnInit(): void {
        this.newsService.getNews().then((newsSources) => {
            this.newsSources = newsSources;
            this.totalNews = this.newsSources.length;
            this.categories = [...Array.from(new Set(this.newsSources.map((source) => source.category)))];
            this.filterData();
        });

        this.searchFormControl.setValue(this.searchInput);
        this.categoryFormControl.setValue(this.selectedCategory);

        this.onSearchSub = this.searchFormControl.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
            this.searchInput = value;
            this.pageIndex = 0;
            this.filterData();
        });

        this.onSelectCategorySub = this.categoryFormControl.valueChanges.subscribe((value) => {
            this.selectedCategory = value;
            this.pageIndex = 0;
            this.filterData();
        });
    }

    ngOnDestroy(): void {
        this.onSearchSub?.unsubscribe();
        this.onSelectCategorySub?.unsubscribe();
    }

    onPaginate(pageEvent: PageEvent): void {
        this.pageIndex = pageEvent.pageIndex;
        this.filterData();
    }

    private filterData(): void {
        let filteredNewsSources = this.newsSources;
        if (this.searchInput) {
            filteredNewsSources = filteredNewsSources.filter((source) =>
                source.name.toLowerCase().includes(this.searchInput.toLowerCase())
            );
        }
        if (this.selectedCategory) {
            filteredNewsSources = filteredNewsSources.filter((source) => source.category === this.selectedCategory);
        }

        this.totalNews = filteredNewsSources.length;
        const start = this.pageIndex * this.pageSize;
        const end = Math.min(start + this.pageSize, this.newsSources.length);
        this.pageNewsSources = filteredNewsSources.slice(start, end);

        this.listFiltered.emit({ category: this.selectedCategory, search: this.searchInput, page: this.pageIndex + 1 });
    }
}
