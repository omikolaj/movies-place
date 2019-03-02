import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.view.html',
  styleUrls: ['./auth.view.css']
})
export class AuthView implements OnInit {
  public loginForm: FormGroup;
  public signupForm: FormGroup;
  public mode: string = 'login';

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {    
    this.signupForm = this.fb.group({
      userName: this.fb.control(null, [Validators.maxLength(25), Validators.minLength(4),Validators.required]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [Validators.required])
    })

    this.loginForm = this.fb.group({
      userName: this.fb.control(null, [Validators.maxLength(25), Validators.minLength(4),Validators.required]),      
      password: this.fb.control(null, [Validators.required])
    })
  }

  public onLogin(){
    console.log(`Inside of onSubmit.`, this.loginForm);
  }

  public onSignup(){
    console.log(`Inside of onSignup`, this.signupForm)
  }

}
