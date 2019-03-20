import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component'
import {BlogComponent} from "./components/blog/blog.component";
import {AboutComponent} from "./components/about/about.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ErrorComponent} from "./components/error/error.component";

const appRoutes: Routes = [
    {
        path: '', redirectTo: '/home', pathMatch: 'full'
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'dashboard', component: DashboardComponent
    },
    {
        path: 'blog', component: BlogComponent
    },
    {
        path: 'profile', component: ProfileComponent
    },
    {
        path: 'about', component: AboutComponent
    },
    {
        path: '**', component: ErrorComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
