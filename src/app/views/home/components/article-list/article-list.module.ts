import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list.component';
import { ArticleItemComponent } from './article-item/article-item.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleItemComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ],
  exports: [
    ArticleListComponent,
    ArticleItemComponent,
    CommonModule
  ]
})
export class ArticleListModule { }
