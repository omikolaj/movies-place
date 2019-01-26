import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesView } from './movies.view';

@NgModule({
  declarations: [
    MoviesView,    
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MoviesView
  ]
})
export class MoviesModule { }
