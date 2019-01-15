import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NavbarComponent } from './navbar.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';

library.add(faBars);

@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    CommonModule, 
    FontAwesomeModule,
    AngularMaterialModule
  ],
  exports: [
    CommonModule,
    NavbarComponent,
    FontAwesomeModule
  ]
})
export class NavbarModule { }
