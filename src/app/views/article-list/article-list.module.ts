import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListView } from './article-list.view';
import { ArticleItemComponent } from './components/article-item/article-item.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';

@NgModule({
  declarations: [
    ArticleListView,
    ArticleItemComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    ArticleListView,
    ArticleItemComponent,
    CommonModule
  ]
})
export class ArticleListModule { }
