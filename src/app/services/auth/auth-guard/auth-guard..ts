import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { CanActivateChild, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
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
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean{
    if(this.authService.isLoggedIn){
      console.log("Inside of auth guard, user is logged in");
      return true
    } else {
      console.log("Inside of auth guard, user not logged in");
      this.store.dispatch(new actions.Unauthorized());
      this.router.navigate(["login"]);      
      return true;
    }
  }  
}
