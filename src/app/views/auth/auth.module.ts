import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginView } from './components/login/login.view';

import { AuthView } from './auth.view';
import { RouterModule } from '@angular/router';
import { SignupView } from './components/signup/signup.view';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    LoginView,
    SignupView,
    AuthView
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,    
    AngularMaterialModule,
    SharedModule
  ],
  exports:[
    LoginView,
    SignupView,
    AuthView
  ]
})
export class AuthModule { }
