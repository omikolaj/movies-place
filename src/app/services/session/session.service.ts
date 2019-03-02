import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

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
