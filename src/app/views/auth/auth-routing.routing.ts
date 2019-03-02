import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginView } from './components/login/login.view';
import { SignupView } from './components/signup/signup.view';
import { AuthView } from './auth.view';


const routes: Routes = [  
  { path: 'login', children: [
    { path: '', component: AuthView }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
