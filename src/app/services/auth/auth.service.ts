import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public authenticate(user: User): Observable<User>{
    console.log(`Authenticating user from UserService. User:${user}`);
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'    
      })
    }
    return this.http.post<User>('api/v1/session/login', JSON.stringify(user), headers);    
   }
}
