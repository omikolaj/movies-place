import { RequestError } from 'src/app/models/requesterror.model';
import { User } from 'src/app/models/user.model';
import { Auth } from 'src/app/models/auth.model';

export class Login {
  static readonly type = '[LOGIN] Login';
  constructor(public payload: Auth) { }
}

export class LoginSuccess {
  static readonly type = '[LOGIN] LoginSuccess';
  constructor(public payload: Auth) { }
}

export class LoginFail {
  static readonly type = '[LOGIN] LoginFail';
  constructor(public payload: RequestError) { }
}

export class Logout{
  static readonly type = '[LOGOUT] Logout';
  constructor() { };
}

export class LogoutSuccess{
  static readonly type = '[LOGOUT] LogoutSuccess';
  constructor(public payload: boolean) { };
}

export class LogoutFail{
  static readonly type = '[LOGOUT] LogoutFail';
  constructor(public payload: RequestError) { };
}

export class SignUp{
  static readonly type = '[SIGNUP] SignUp'
  constructor(public payload: User) { };
}

export class SignUpSuccess{
  static readonly type = '[SIGNUP] SignUpSuccess'
  constructor(public payload: Auth) { };
}

export class SignUpFail{
  static readonly type = '[SIGNUP] SignUpFail'
  constructor(public payload: RequestError) { };
}

export class RefreshToken {
  static readonly type = '[REFRESH_TOKEN] RefreshToken';
  constructor() { }
}

export class RefreshTokenFail {
  static readonly type = '[REFRESH_TOKEN] RefreshTokenFail';
  constructor(public payload: RequestError) { }
}

export class RefreshTokenSuccess {
  static readonly type = '[REFRESH_TOKEN] RefreshTokenSuccess';
  constructor(public payload: any) { }
}

export class Unauthorized {
  static readonly type = '[UNAUTHORIZED] Unauthorized';
  constructor() { };
}