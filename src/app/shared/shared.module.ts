import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { LoaderModule } from '../components/loader/loader.module';
import { RequestHandlerComponent } from './request-handler/request-handler.component';
import { ErrorComponent } from '../components/error/error.component';
import { ErrorModule } from '../components/error/error.module';

@NgModule({
  declarations: [
    MovieDetailComponent,
    RequestHandlerComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    LoaderModule,
    ErrorModule
  ],
  exports: [
    MovieDetailComponent,
    RequestHandlerComponent
  ]
})
export class SharedModule { }
