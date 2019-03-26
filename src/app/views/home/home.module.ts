import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { HomeView } from './home.view';
import { FeedComponent } from './components/feed/feed.component';
import { PostListModule } from '../home/components/post-list/post-list.module';
import { HomeRoutingModule } from './home-routing.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeView,
    FeedComponent,    
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    PostListModule,
    RouterModule
  ],
  exports: [
    HomeView,
    FeedComponent,
    PostListModule,
    AngularMaterialModule,
  ]
})
export class HomeModule { }
