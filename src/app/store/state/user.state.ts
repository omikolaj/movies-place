import { RequestError } from 'src/app/models/requesterror.model';
import { User } from 'src/app/models/user.model';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import * as actions from '../actions/user.actions';
import { mergeMap, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SessionService } from 'src/app/services/session/session.service';

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
  constructor(private sessionService: SessionService) { }

  @Selector()
  static users(state: UserStateModel){
    return state.users;
  }
}

