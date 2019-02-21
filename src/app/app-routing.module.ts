import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeRoutingModule } from './views/home/home-routing.routing';
import { MoviesRoutingModule } from './views/movies/movies-routing.routing';
import { PostItDialogRouting } from './views/post-it-dialog/post-it-dialog.routing';
import { HomeView } from './views/home/home.view';

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
    MoviesRoutingModule,
    PostItDialogRouting
  ],
  exports: [RouterModule,
     HomeRoutingModule,     
     MoviesRoutingModule,
     PostItDialogRouting
    ]
})
export class AppRoutingModule { }
