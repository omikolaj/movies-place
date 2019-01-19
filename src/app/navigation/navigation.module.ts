import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { RepoPickerComponent } from './repo-picker/repo-picker.component';
import { GithubButtonComponent } from './repo-picker/github-button/github-button.component';

library.add(faBars);

@NgModule({
  declarations: [
    HeaderComponent,
    SidenavListComponent,
    HeaderComponent,
    RepoPickerComponent,
    GithubButtonComponent 
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
    AngularMaterialModule,
    RepoPickerComponent
  ]
})
export class NavigationModule { }
