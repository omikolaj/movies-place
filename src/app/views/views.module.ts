import { NgModule } from '@angular/core';
import { HomeModule } from './home/home.module';
import { MoviesModule } from './movies/movies.module';
import { PostItDialogModule } from './post-it-dialog/post-it-dialog.module';

@NgModule({
  imports: [
    HomeModule,
    MoviesModule,
    PostItDialogModule
  ],
  exports: [
    HomeModule,
    MoviesModule,
    PostItDialogModule
  ]
})
export class ViewsModule { }
