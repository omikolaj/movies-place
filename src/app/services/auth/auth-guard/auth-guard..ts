import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import * as actions from '../../../store/actions/auth.actions';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(private authService: AuthService, private router: Router, private store: Store) { }
  canActivate() : Observable<boolean> | Promise<boolean> | boolean{
    if(this.authService.isLoggedIn){
      console.log("Inside of auth guard, user is logged in");      
      return true
    } else {
      console.log("Inside of auth guard, user not logged in");
      this.store.dispatch(new actions.RefreshToken()).subscribe(
        () => console.log("HTTP Request made"),
        () => console.log("HTTP Reuqest error"),
        () => {
          console.log("HTTP Request completed")
          if(this.authService.isLoggedOut){
            this.store.dispatch(new actions.Unauthorized());
            this.router.navigate(["login"]);    
            return false;  
          }  
          return false;
        }
      )                
    }
  }  
}
