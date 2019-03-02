import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesView } from './movies.view';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MoviesView,    
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MoviesView,
  ]
})
export class MoviesModule { }
