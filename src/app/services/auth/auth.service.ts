import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Auth } from 'src/app/models/auth.model';
import * as moment from "moment";
import { tap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public authenticate(user: Auth): Observable<Auth>{
    console.log(`Authenticating user from Auth. User:${user}`);
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'    
      })
    }
    return this.http.post<any>('api/v1/session/login', JSON.stringify(user), headers).pipe(
      tap(
        res => this.setSession(JSON.parse(res))
      ),
      shareReplay()
    );
   }

   private setSession(authResult): void{          
     const expiresAt = moment().add(authResult.expires_in, 'second');     

     localStorage.setItem('token', authResult.token);
     localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
   }

   public logout(): void{
    localStorage.removeItem('token');
    localStorage.RemoveItem('expires_at');
   }

   public get isLoggedIn(): boolean{
     return moment().isBefore(this.getExpiration);
   }

   public get isLoggedOut(): boolean{
     return !this.isLoggedIn;
   }

   public get getExpiration(){
     const expiration = localStorage.getItem('expires_at');
     const expiresAt = JSON.parse(expiration);
     return moment(expiresAt);
   }

  //  public get userRole(): Roles{
  //    return Roles[localStorage.getItem('role')];
  //  }

}
