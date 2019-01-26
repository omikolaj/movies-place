import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailComponent } from 'src/app/shared/movie-detail/movie-detail.component';

const routes: Routes = [
  { path: 'movies',
    children: [
      { path: ':id', component: MovieDetailComponent }
    ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
