import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './components/main-page/main-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
    declarations: [AppComponent, MainPageComponent, HeaderComponent, FooterComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
