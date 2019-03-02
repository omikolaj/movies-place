import { Component, OnInit, Input, TemplateRef, ContentChild } from '@angular/core';
import { LoginDirective } from 'src/app/shared/directives/login/login.directive';
import { SignupDirective } from 'src/app/shared/directives/signup/signup.directive';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.view.html',
  styleUrls: ['./login.view.css']
})
export class LoginView implements OnInit {
  @Input() public authForm: FormGroup;

  @Input() public mode: 'login' | 'signup' = 'login';

  @ContentChild(LoginDirective, { read: TemplateRef }) loginTemplate;
  @ContentChild(SignupDirective, { read: TemplateRef }) signupTemplate;

  constructor() { }

  ngOnInit() {
    console.log("Inside of login, authForm: ",this.authForm)
    console.log("Inside of login, loginTemplate: ",this.loginTemplate)
  }

  ngAfterViewInit(){
    console.log("Inside of login, loginTemplate: ",this.loginTemplate)
  }

}
