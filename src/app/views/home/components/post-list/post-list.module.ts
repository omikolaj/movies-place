import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list.component';
import { PostItemComponent } from './post-item/post-item.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { RouterModule } from '@angular/router';
import { LoaderModule } from 'src/app/components/loader/loader.module';

@NgModule({
  declarations: [
    PostListComponent,
    PostItemComponent, 
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    LoaderModule
  ],
  exports: [
    PostListComponent,
    PostItemComponent,
    CommonModule
  ]
})
export class PostListModule { }
