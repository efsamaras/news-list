import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsListComponent } from './news-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('NewsListComponent', () => {
    let component: NewsListComponent;
    let fixture: ComponentFixture<NewsListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NewsListComponent],
            imports: [HttpClientModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NewsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
