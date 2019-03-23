import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeView } from './home.view';
import { AuthGuardService } from 'src/app/services/auth/auth-guard/auth-guard.';

const routes: Routes = [
  { path: 'posts/new',  redirectTo:''},  
  { path: '', component: HomeView, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
