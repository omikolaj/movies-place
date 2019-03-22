import { RequestError } from 'src/app/models/requesterror.model';
import { State, Selector, Action, StateContext, createSelector } from '@ngxs/store';
import * as actions from '../actions/auth.actions';
import { catchError, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Auth, Roles, Permissions } from 'src/app/models/auth.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from "jwt-decode";
import { HttpClientXsrfModule } from '@angular/common/http';

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

  private getDecodedAccessToken(token: string): any{
    try{
      return jwt_decode(token);
    }
    catch(error){
      return null;
    }
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
          userId: userAuthRequest.userId,
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
    const payloadAsString = payload.toString();
    const parsedToken = JSON.parse(payloadAsString);
    const token = this.getDecodedAccessToken(parsedToken.token);
    const permissions = token.permission.map(p => Permissions[p]);   
    const userRoles = token.role instanceof Array ? token.role.map(r => Roles[r]) : Roles[token.role];
    const state = ctx.getState();
    ctx.patchState({
      ...state,      
      auth: {
        userId: parsedToken.id,
        expires_in: parsedToken.expires_in,
        username: token.UserName,
        roles: userRoles,        
        permissions: permissions
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

  @Action(actions.Logout)
  logout(ctx: StateContext<AuthStateModel>){
    console.log("Inside of store logout");
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      request: {
        loading: true,
        error: null
      }      
    })
    return this.authService.logout().pipe(
      switchMap(logoutRequest => ctx.dispatch(new actions.LogoutSuccess(logoutRequest))),
      catchError(error => {
        ctx.dispatch(new actions.LogoutFail(error))
        return of({})
      })
    )
    .subscribe((res => console.log("HTTP response", res)))    
  }

  @Action(actions.LogoutSuccess)
  logoutSuccess(ctx: StateContext<AuthStateModel>, { payload }: actions.LogoutSuccess){
    console.log("Inside of logoutSuccess");
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      authorized: !payload,  
      request: {
        loading: false,
        error: null
      }    
    })
    return this.authService.unauthorized();
  }
  
  @Action(actions.LogoutFail)
  logoutFail(ctx: StateContext<AuthStateModel>, { payload }: actions.LogoutFail){
    console.log("Inside of logoutFail");
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      request: {
        loading: false,
        error: payload
      }
    });
  }

  @Action(actions.RefreshToken)
  refreshToken(ctx: StateContext<AuthStateModel>){
    console.log("Inside of refreshToken");
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      authorized: false,
      request: {
        loading: true,
        error: null
      }      
    })
    return this.authService.refreshToken().pipe(
      switchMap((refreshTokenRequest) => {
        const refreshToken: Auth = {
          token: refreshTokenRequest.token,
          userId: refreshTokenRequest.userId,
          expires_in: refreshTokenRequest.expires_in
        }
        return ctx.dispatch(new actions.RefreshTokenSuccess(refreshTokenRequest))
      }
    ),
    catchError(error => {
      ctx.dispatch(new actions.RefreshTokenFail(error))
      return of({});
    })
    )
  }

  @Action(actions.RefreshTokenSuccess)
  refreshTokenSuccess(ctx: StateContext<AuthStateModel>, { payload }: actions.RefreshTokenSuccess){
    console.log("On refresh token success")
    // const payloadAsString = payload.toString();
    // const parsedToken = JSON.parse(payloadAsString);
    const token = this.getDecodedAccessToken(payload.token);
    const permissions = token.permission.map(p => Permissions[p]);   
    const userRoles = token.role instanceof Array ? token.role.map(r => Roles[r]) : Roles[token.role];
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      authorized: true,
      auth: {
        userId: payload.id,
        expires_in: payload.expires_in,
        username: token.UserName,
        roles: userRoles,        
        permissions: permissions
      },
      request: {
        loading: false,
        error: null
      }
    })
  }

  @Action(actions.RefreshTokenFail)
  refreshTokenFail(ctx: StateContext<AuthStateModel>, { payload }: actions.RefreshTokenFail){
    console.log("On refresh token fail");
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      authorized: false,
      request: {
        loading: false,
        error: null
      }      
    })
    return this.authService.unauthorized();
  }
}