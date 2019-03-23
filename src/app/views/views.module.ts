import { NgModule } from '@angular/core';
import { HomeModule } from './home/home.module';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    HomeModule,
    MoviesModule,
    AuthModule,
    SharedModule 
  ],
  exports: [
    HomeModule,
    MoviesModule,
    AuthModule,
  ],
  declarations: []
})
export class ViewsModule { }
