import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeView } from './home.view';
import { AuthGuardService } from 'src/app/services/auth/auth-guard/auth-guard.';

import { PostItDialog } from 'src/app/components/post-it-dialog/post-it-dialog.component';
import { PostItDialogContainerComponent } from 'src/app/components/post-it-dialog-container/post-it-dialog-container.component';

const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },  
  { path: 'posts', canActivate: [AuthGuardService], children: [
    { path: '', component: HomeView,  },    
    { path: 'new', component: PostItDialogContainerComponent, outlet: 'modal' },
    { path: ':id/edit', component: PostItDialogContainerComponent, outlet: 'modal' }, 
  ]}
 ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
