import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { User } from 'src/app/models/user.model';
import * as actions from '../../store/actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class SessionFacadeService {

  constructor(private store: Store) { }

  public login(userLoginInfo: FormGroup){
    const user: User = {
      username: userLoginInfo.value.username,
      password: userLoginInfo.value.password
    }
    this.store.dispatch(new actions.Login(user))
  }
}
