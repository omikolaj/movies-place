import { RequestError } from 'src/app/models/requesterror.model';
import { State, Selector, Action, StateContext, createSelector } from '@ngxs/store';
import * as actions from '../actions/auth.actions';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Auth } from 'src/app/models/auth.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from "jwt-decode";

export interface AuthStateModel {
  auth: Auth,
  authorized: boolean,
  request: {
    loading: boolean,
    error: RequestError
  }
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    auth: null,
    authorized: false,
    request: {
      loading: false,
      error: null
    }
  }
})

export class AuthState {
  constructor(private authService: AuthService) { }

  @Selector()
  static users(state: AuthStateModel) {
    return state.auth;
  }

  static request(type: string){
    return createSelector([AuthState], (state: AuthStateModel) => {
      return state.request[type];
    })
  }

  @Action(actions.Login)
  authenticate(ctx: StateContext<AuthStateModel>, { payload }: actions.Login) {
    console.log("Inside of authenticate. Payload is:", payload);
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      request: {
        loading: true,
        error: null
      }
    })
    return this.authService.authenticate(payload).pipe(
      switchMap((userAuthRequest) => {
        const userAuth: Auth = {
          token: userAuthRequest.token,
          id: userAuthRequest.id,
          expires_in: userAuthRequest.expires_in
        }
        console.log("Inside of user state authenticate merge map method", userAuthRequest);
        return ctx.dispatch(new actions.LoginSuccess(userAuthRequest))
      }),
      catchError((error) => {
        ctx.dispatch(new actions.LoginFail(error))
        return of({});
      })
    )
      .subscribe(
        res => console.log("HTTP response", res),
        err => console.log("HTTP error", err),
        () => console.log("HTTP request completed")
      )
  }

  @Action(actions.LoginSuccess)
  loginSuccess(ctx: StateContext<AuthStateModel>, { payload }: actions.LoginSuccess){
    console.log("Inside of loginSuccess", payload);
    const state = ctx.getState();
    ctx.patchState({
      ...state,      
      auth: {
        id: payload.id,
        expires_in: payload.expires_in,
        username: payload.username,
        token: payload.token
      },
      authorized: true,
      request: {
        loading: false,
        error: null
      }
    })
  }

  @Action(actions.LoginFail)
  loginFail(ctx: StateContext<AuthStateModel>, { payload }: actions.LoginFail){
    console.log("Inside of loginFail");
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      authorized: false,
      request: {
        loading: false,
        error: payload
      }
    })
  }
}