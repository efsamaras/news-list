import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

export interface NewsSource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

@Injectable({
    providedIn: 'root',
})
export class NewsService {
    private newsApiUrl = 'https://newsapi.org/v2/top-headlines/sources?apiKey=09b2a48dc89f416caada3626ec05f9eb';

    constructor(private http: HttpClient) {}

    getNews(): Promise<NewsSource[]> {
        return this.http
            .get(this.newsApiUrl)
            .pipe(
                map((response: { status: string; sources: NewsSource[] }) => response.sources),
                catchError((error) => {
                    console.log(error);
                    return of(null);
                })
            )
            .toPromise();
    }
}
