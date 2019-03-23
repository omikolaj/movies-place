import { Directive, HostListener, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Directive({
  selector: '[appIsLoggedIn]'
})
export class IsLoggedInDirective {
  constructor(
    private authService: AuthService,
    private el: ElementRef
  ) { }

  @HostListener('click') onMouseClick(){
   return this.authService.isLoggedIn ? true : false
  }  

  private disableElement(){
  }
  

}
