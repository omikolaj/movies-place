import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';

library.add(faBars);

@NgModule({
  declarations: [
    HeaderComponent,
    SidenavListComponent,
    HeaderComponent 
  ],
  imports: [
    CommonModule, 
    FontAwesomeModule,
    AngularMaterialModule
  ],
  exports: [
    CommonModule,
    FontAwesomeModule,
    SidenavListComponent,
    HeaderComponent,
    AngularMaterialModule
  ]
})
export class NavigationModule { }
