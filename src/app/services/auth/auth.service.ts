import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Auth } from 'src/app/models/auth.model';
import * as moment from "moment";
import { tap, shareReplay, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import * as actions from '../../store/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public redirectUrl: string = "";

  constructor(private http: HttpClient, private route: Router, private store: Store) { }

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

   public refreshToken(): Observable<Auth>{
     console.log('Refreshing token from refreshToken');
     return this.http.get<any>('api/v1/refresh').pipe(
       tap(
         res => {
           console.log("This is the result from the refreshToken method:", res);
           return this.setSession(res);
         }
       ),
       shareReplay()
     )
   }

   public unauthorized(): Observable<boolean> | Promise<boolean>{
    return this.route.navigate(['login']);
   }

   private setSession(authResult): void{   
     const expiresAt = moment().add(authResult.expires_in, 'second');     

    //  localStorage.setItem('token', authResult.token);
     localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
   }

   public logout(): Observable<boolean>{
    // localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    console.log("Inside of logout in auth.service.ts");

    return this.http.delete<boolean>('api/v1/session/logout').pipe(
      tap(
        res => {
          console.log("Logout response:", res);
        }
      ),
      shareReplay()
    )    
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

}
