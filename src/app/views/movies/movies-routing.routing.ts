import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesView } from './movies.view';
import { MovieDetailComponent } from 'src/app/shared/movie-detail/movie-detail.component';

const routes: Routes = [    
    { path: 'movies',   children: [
        { path: '', component: MoviesView },
        { path: ':id', component: MovieDetailComponent }
  ]},
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class MoviesRoutingModule { }