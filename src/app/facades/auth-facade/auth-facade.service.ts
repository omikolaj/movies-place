import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { User } from 'src/app/models/user.model';
import * as actions from '../../store/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {

  constructor(private store: Store) { }

  public login(userLoginInfo: FormGroup){
    console.log("Inside of login in session facade");
    const user: User = {
      username: userLoginInfo.value.username,
      password: userLoginInfo.value.password
    }
    this.store.dispatch(new actions.Login(user))
  }
}
