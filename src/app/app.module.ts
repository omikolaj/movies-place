import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { ArticleListModule } from './articles/article-list/article-list.module';
import { LayoutComponent } from './layout/layout.component';
import { NavigationModule } from './navigation/navigation.module';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    LayoutComponent   
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
