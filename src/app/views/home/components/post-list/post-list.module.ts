import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list.component';
import { PostItemComponent } from './post-item/post-item.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { RouterModule } from '@angular/router';
import { LoaderModule } from 'src/app/components/loader/loader.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RequestHandlerComponent } from 'src/app/shared/request-handler/request-handler.component';
import { PostItemEditComponent } from 'src/app/views/home/components/post-list/post-item-edit/post-item-edit.component';

@NgModule({
  declarations: [
    PostListComponent,
    PostItemComponent,
    PostItemEditComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    LoaderModule,
    SharedModule
  ],
  exports: [
    PostListComponent,
    PostItemComponent,
    CommonModule
  ]
})
export class PostListModule { }
