import { RequestError } from 'src/app/models/requesterror.model';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import * as actions from '../actions/auth.actions';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Auth } from 'src/app/models/auth.model';

export interface AuthStateModel {
  auth: Auth
  request: {
    loading: boolean,
    error: RequestError
  }
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    auth: null,
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
}