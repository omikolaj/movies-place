import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';

@NgModule({
  declarations: [
    MovieDetailComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    MovieDetailComponent
  ]
})
export class SharedModule { }
