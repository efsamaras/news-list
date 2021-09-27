import { Component, Input, OnInit } from '@angular/core';
import { NewsSource } from '../../services/news.service';

@Component({
    selector: 'app-news-source',
    templateUrl: './news-source.component.html',
    styleUrls: ['./news-source.component.scss'],
})
export class NewsSourceComponent implements OnInit {
    @Input() source: NewsSource;

    constructor() {}

    ngOnInit(): void {}
}
