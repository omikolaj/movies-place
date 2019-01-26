import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { HomeView } from './home.view';
import { FeedComponent } from './components/feed/feed.component';
import { ArticleListModule } from '../home/components/article-list/article-list.module';
import { HomeRoutingModule } from './home-routing.routing';

@NgModule({
  declarations: [
    HomeView,
    FeedComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ArticleListModule,
    HomeRoutingModule
  ],
  exports: [
    HomeView,
    FeedComponent,
    ArticleListModule,
    AngularMaterialModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
