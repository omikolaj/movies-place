import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService{
  constructor() { }

public authenticate(user: User): Observable<User>{
  console.log(`Authenticating user from UserService. User:${user}`);
  return of({username: "UserFromAuthenticateService", password: "password"});
 }
}
