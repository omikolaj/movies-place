import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeView } from './views/home/home.view';

const routes: Routes = [
  {path: 'movies/:id', loadChildren: './home/home.module#HomeModule'}, 
  {path: '', component: HomeView},
  {path: '**', component: HomeView}
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes, 
    {enableTracing: true}
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
