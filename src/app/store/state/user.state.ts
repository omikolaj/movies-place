import { RequestError } from 'src/app/models/requesterror.model';
import { User } from 'src/app/models/user.model';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { UserService } from 'src/app/services/user/user-service.service';
import * as actions from '../actions/user.actions';
import { mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface UserStateModel{
  users: User[],
  request: {
    loading: boolean,
    error: RequestError
  }
}

@State<UserStateModel>({
  name: 'user',
    defaults: {
      users: [],
      request: {
        loading: false,
        error: null
      }
    }  
})

export class UserState{
  constructor(private userService: UserService) { }

  @Selector()
  static users(state: UserStateModel){
    return state.users;
  }

  @Action(actions.Login)
  authenticate(ctx: StateContext<UserStateModel>, { payload }: actions.Login){
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      request: {
        loading: true,
        error: null
      }
    })
    return this.userService.authenticate(payload).pipe(
      mergeMap((userAuthRequest) => {
        console.log(userAuthRequest);
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

