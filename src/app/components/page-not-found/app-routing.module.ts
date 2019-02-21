import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { HomeRoutingModule } from '../../views/home/home-routing.routing';
import { MoviesRoutingModule } from '../../views/movies/movies-routing.routing';

const routes: Routes = [          
  { path: 'not-found', component: PageNotFoundComponent, pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
    routes, 
      { enableTracing: true }),
    HomeRoutingModule,     
    MoviesRoutingModule    
  ],
  exports: [RouterModule,
     HomeRoutingModule,     
     MoviesRoutingModule 
    ]
})
export class AppRoutingModule { }
