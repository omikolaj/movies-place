import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { HomeView } from './home.view';
import { FeedComponent } from './components/feed/feed.component';
import { ArticleListModule } from '../article-list/article-list.module';

@NgModule({
  declarations: [
    HomeView,
    FeedComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ArticleListModule,
  ],
  exports: [
    HomeView,
    FeedComponent,
    ArticleListModule,
    AngularMaterialModule
  ]
})
export class HomeModule { }
