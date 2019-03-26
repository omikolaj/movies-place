import { Component, OnInit, ViewChild, TemplateRef, ContentChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthFacadeService } from 'src/app/facades/auth-facade/auth-facade.service';
import { ofActionSuccessful, ofActionDispatched, Actions } from '@ngxs/store';
import * as actions from '../../store/actions/auth.actions';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';
import { MatTab } from "@angular/material/tabs"
import { RequestError } from 'src/app/models/requesterror.model';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.view.html',
  styleUrls: ['./auth.view.css']
})
export class AuthView implements OnInit {
  public loginForm: FormGroup;
  public signupForm: FormGroup;  
  private afterSuccessLogin: Subscription;
  private afterFailLogin: Subscription;
  private afterSuccessSignUp: Subscription;
  private unauthorizedSubscription: Subscription;
  private afterSignupFail: Subscription;
  private errors: string[];
  tabs = ['login', 'signup'];
  selected = new FormControl(0);
  emailError : string = null;
  usernameError : string = null;

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacadeService,
    private router: Router,
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
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
        (error) => {
          console.log("error occured", error)
          let authError;
          const subscribtion = this.authFacade.error$.subscribe(
            (value) => {
              console.log("Inside of afterFailLogin, the value is: ", value);
              return authError = value;
            })
          const errorMessage: string = authError.customError.login_failure[0];
          subscribtion.unsubscribe();
          
          this.loginForm.controls['username'].setErrors({invalid: true});
          this.loginForm.controls['password'].setValue('');
          this.loginForm.controls['password'].setErrors({invalid: true});

          return this.openSnackBar(errorMessage, "Dismiss");
        }        
      );

    this.afterSuccessSignUp = this.actions$.pipe(ofActionSuccessful(actions.SignUpSuccess))
      .subscribe(
        () => {
          console.log("Inside of on successful sign up ");
          return this.router.navigate(['']);
        }
      );

      this.afterSignupFail = this.actions$.pipe(ofActionDispatched(actions.SignUpFail))
        .subscribe(
          () => {
            console.log("Inside of on signup fail");
            let signUpError: RequestError;
          const subscribtion = this.authFacade.error$.subscribe(
            (value) => {
              console.log("Inside of afterFailLogin, the value is: ", value);
              return signUpError = value;
            })          
          subscribtion.unsubscribe();
          if(signUpError.errorStatus.includes("400")){
            let validationErrorDictinary = signUpError.customError;
            for(var fieldName in validationErrorDictinary){
              if(validationErrorDictinary.hasOwnProperty(fieldName)){
                if(this.signupForm.controls[fieldName]){
                  validationErrorDictinary[fieldName].forEach(element => {                                        
                    if(fieldName == 'email'){
                      this.emailError = element;
                    }
                    if(fieldName == 'username'){
                      this.usernameError = element;
                    }
                  });
                  this.signupForm.controls[fieldName].setErrors({invalid: true});   
                }
                else{
                  this.errors.push(validationErrorDictinary[fieldName]);
                }
              }
            }
          }else{
            this.errors.push("Something went wrong!");
          }
        }
        )

    this.unauthorizedSubscription = this.actions$.pipe(ofActionDispatched(actions.Unauthorized))
      .subscribe(
        () => {
          return this.openSnackBar("You must be authorized", "Dismiss");
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
    this.afterSignupFail.unsubscribe();
    this.unauthorizedSubscription.unsubscribe();
  }

  ngAfterContentChecked(){    
    const activeTabIndex = parseInt(localStorage.getItem('selectedTab'));
    if(this.selected.value != activeTabIndex){
      this.selected.setValue(activeTabIndex); 
    }
  }

  onTabChange(event: MatTabChangeEvent){
    console.log("Change tab event: ", event);
    if(event.tab.textLabel.toLocaleLowerCase() == "sign up"){
      localStorage.setItem("selectedTab", event.index.toString());
      window.history.replaceState({}, '', '/signup')     
      console.log(this.tabs);
    }
    if(event.tab.textLabel.toLocaleLowerCase() == 'login'){      
      localStorage.setItem("selectedTab", event.index.toString());
      window.history.replaceState({}, '', '/login')      
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
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