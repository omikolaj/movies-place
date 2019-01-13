import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
//import { ArticleListComponent } from './articles/article-list/article-list.component';
import { ArticleListModule } from './articles/article-list/article-list.module';
import { NavbarModule } from './navbar/navbar.module';


@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ArticleListModule,
    NavbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
