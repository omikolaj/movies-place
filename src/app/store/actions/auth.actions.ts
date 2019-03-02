import { RequestError } from 'src/app/models/requesterror.model';
import { User } from 'src/app/models/user.model';

export class Login {
  static readonly type = '[LOGIN] Login';
  constructor(public payload: User) { }
}

export class LoginSuccess {
  static readonly type = '[LOGIN] LoginSuccess';
  constructor(public payload: User) { }
}

export class LoginFail {
  static readonly type = '[LOGIN] LoginFail';
  constructor(public payload: RequestError) { }
}