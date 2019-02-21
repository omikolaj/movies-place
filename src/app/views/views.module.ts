import { NgModule } from '@angular/core';
import { HomeModule } from './home/home.module';
import { MoviesModule } from './movies/movies.module';

@NgModule({
  imports: [
    HomeModule,
    MoviesModule    
  ],
  exports: [
    HomeModule,
    MoviesModule    
  ]
})
export class ViewsModule { }
