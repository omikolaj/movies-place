import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { User } from 'src/app/models/user.model';
import * as actions from '../../store/actions/auth.actions';
import { Auth } from 'src/app/models/auth.model';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/store/state/auth.state';
import { RequestError } from 'src/app/models/requesterror.model';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {
  @Select(AuthState.request("loading")) loading$: Observable<boolean>;
  @Select(AuthState.request("error")) error$: Observable<RequestError>;

  constructor(private store: Store) { }

  public login(userLoginInfo: FormGroup){
    console.log("Inside of login in session facade");
    const user: Auth = {
      username: userLoginInfo.value.username,
      password: userLoginInfo.value.password
    }
    return this.store.dispatch(new actions.Login(user))
  }

  public logout(): Observable<boolean>{
    console.log("Inside of logout in session facade");
    return this.store.dispatch(new actions.Logout());
  }

  public signUp(newUserForm: FormGroup): Observable<Auth>{
    console.log("Inside of signup in session facade");
    const newUser: User = {
      username: newUserForm.value.username,
      email: newUserForm.value.email,
      password: newUserForm.value.password
    };    

    return this.store.dispatch(new actions.SignUp(newUser));
  }
}
