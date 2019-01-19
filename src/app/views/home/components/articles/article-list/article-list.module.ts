import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list.component';
import { ArticleItemComponent } from './article-item/article-item.component';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ArticleListComponent,
    ArticleItemComponent,
    CommonModule
  ]
})
export class ArticleListModule { }
