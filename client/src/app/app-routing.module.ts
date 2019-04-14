import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// components
import {HomeComponent} from './components/home/home.component';
import {BlogComponent} from "./components/blog/blog.component";
import {AboutComponent} from "./components/about/about.component";
import {ErrorComponent} from "./components/error/error.component";
import {ArticleComponent} from "./components/article/article.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ProfileComponent} from "./components/profile/profile.component";

// guards
import {AuthGuard} from "./guards/auth.guard";
import {NotAuthGuard} from "./guards/notAuth.guard";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'blog',
        component: BlogComponent
    },
    {
        path: 'blog/post/:id',
        component: ArticleComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'profile/:userName',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NotAuthGuard]
    },
    {
        path: '**',
        component: ErrorComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
