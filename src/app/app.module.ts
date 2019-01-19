import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './views/home/components/feed/feed.component';
import { ArticleListModule } from './views/home/components/articles/article-list/article-list.module';
import { LayoutComponent } from './hoc/layout/layout.component'
import { NavigationModule } from './components/navigation/navigation.module';
import { HomeComponent } from './views/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    LayoutComponent,
    HomeComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ArticleListModule,
    NavigationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
