import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostItDialog } from './post-it-dialog.component';

const routes: Routes = [    
  // { path: 'post', component: PostItDialog }        
]

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
})
export class PostItDialogRouting { }