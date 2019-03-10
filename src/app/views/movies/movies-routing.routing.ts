import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesView } from './movies.view';
import { MovieDetailComponent } from 'src/app/shared/movie-detail/movie-detail.component';
import { AuthGuard } from 'src/app/services/auth/auth-guard/auth-guard.';


const routes: Routes = [    
    { path: 'movies', canActivate: [AuthGuard], children: [
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