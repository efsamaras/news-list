import { Component, OnInit } from '@angular/core';
import { NewsService, NewsSource } from '../../services/news.service';

@Component({
    selector: 'app-news-list',
    templateUrl: './news-list.component.html',
    styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit {
    public newsSources: NewsSource[];
    public pageNewsSources: NewsSource[]; // news sources of the visible page

    public pageIndex = 0;
    public readonly pageSize = 6;

    constructor(private newsService: NewsService) {}

    ngOnInit(): void {
        this.newsService.getNews().then((newsSources) => {
            this.newsSources = newsSources;
            this.filterData();
        });
    }

    private filterData(): void {
        const start = this.pageIndex * this.pageSize;
        const end = Math.min(start + this.pageSize, this.newsSources.length);
        this.pageNewsSources = this.newsSources.slice(start, end);
    }
}
