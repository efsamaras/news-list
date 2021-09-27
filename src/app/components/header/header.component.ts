import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    public name = 'Stratos';
    public surname = 'Samaras';
    public acronym: string;

    constructor() {}

    ngOnInit(): void {
        this.acronym = this.name.charAt(0) + this.surname.charAt(0);
    }
}
