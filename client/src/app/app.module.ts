import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {
    MatInputModule,
    MatButtonModule
} from "@angular/material";

// services
import {AuthService} from './service/auth.service';

// components
import {AppComponent} from './app.component';
import {AboutComponent} from './components/about/about.component';
import {ArticleComponent} from './components/article/article.component';
import {BlogComponent} from './components/blog/blog.component';
import {BlogCardComponent} from './components/blog-card/blog-card.component';
import {ErrorComponent} from './components/error/error.component';
import {HomeComponent} from './components/home/home.component';
import {FlashMessageComponent} from './components/flash-message/flash-message.component';
import {LoginComponent} from './components/login/login.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import {ProfileComponent} from './components/profile/profile.component';
import {RegisterComponent} from './components/register/register.component';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        ArticleComponent,
        BlogComponent,
        BlogCardComponent,
        ErrorComponent,
        HomeComponent,
        FlashMessageComponent,
        LoginComponent,
        NavbarComponent,
        PaginationComponent,
        ProfileComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
