import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { NavbarComponent } from './navbar.component';

library.add(faBars);

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule, 
    FontAwesomeModule  
  ],
  exports: [
    CommonModule,
    NavbarComponent,
    FontAwesomeModule
  ]
})
export class NavbarModule { }
