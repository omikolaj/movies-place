import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthFacadeService } from 'src/app/facades/auth-facade/auth-facade.service';
import { ofActionSuccessful, ofActionDispatched, Actions } from '@ngxs/store';
import * as actions from '../../store/actions/auth.actions';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.view.html',
  styleUrls: ['./auth.view.css']
})
export class AuthView implements OnInit {
  public loginForm: FormGroup;
  public signupForm: FormGroup;
  public mode: string = 'login';
  private afterSuccessLogin: Subscription;
  private afterFailLogin: Subscription;
  private afterSuccessSignUp: Subscription;
  private unauthorizedSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacadeService,
    private router: Router,
    private actions$: Actions,
    private snackBar: MatSnackBar
  ) {
    this.afterSuccessLogin = this.actions$.pipe(ofActionSuccessful(actions.LoginSuccess))
      .subscribe(
        () => {
          console.log('inside of onLogin subscribe. Re-routing');
          return this.router.navigate(['']);
        }
      );
    this.afterFailLogin = this.actions$.pipe(ofActionDispatched(actions.LoginFail))
      .subscribe(
        (error) => console.log("error occured", error)
      );
    this.afterSuccessSignUp = this.actions$.pipe(ofActionSuccessful(actions.SignUpSuccess))
      .subscribe(
        () => {
          console.log("Inside of on successful sign up ");
          return this.router.navigate(['']);
        }
      );    

      this.unauthorizedSubscription = this.actions$.pipe(ofActionDispatched(actions.Unauthorized))
      .subscribe(
        () => {          
          return this.openSnackBar();
        }
      );
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: this.fb.control(null, [Validators.maxLength(25), Validators.minLength(4), Validators.required]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [Validators.required])
    })

    this.loginForm = this.fb.group({
      username: this.fb.control(null, [Validators.maxLength(25), Validators.minLength(4), Validators.required]),
      password: this.fb.control(null, [Validators.required])
    })
  }

  ngOnDestroy() {
    this.afterSuccessLogin.unsubscribe();
    this.afterFailLogin.unsubscribe();
    this.afterSuccessSignUp.unsubscribe();
  }

  openSnackBar() {
    this.snackBar.open("You must be authenticated", "Dismiss", {
      duration: 3000,
    });
  }

  public onLogin() {
    console.log(`Inside of onLogin.`, this.loginForm);
    this.authFacade.login(this.loginForm);
  }

  public onSignup() {
    console.log(`Inside of onSignup`, this.signupForm)
    this.authFacade.signUp(this.signupForm);
  }

}