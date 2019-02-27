import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { LoaderModule } from '../components/loader/loader.module';
import { RequestHandlerComponent } from './request-handler/request-handler.component';
import { ErrorModule } from '../components/error/error.module';
import { RatingToArrayPipe } from './pipes/rating-to-array/rating-to-array.pipe';


@NgModule({
  declarations: [
    MovieDetailComponent,
    RequestHandlerComponent,
    RatingToArrayPipe
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    LoaderModule,
    ErrorModule
  ],
  exports: [
    MovieDetailComponent,
    RequestHandlerComponent,
    RatingToArrayPipe
  ]
})
export class SharedModule { }
