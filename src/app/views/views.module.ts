import { NgModule } from '@angular/core';
import { HomeModule } from './home/home.module';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  imports: [
    HomeModule,
    MoviesModule,
    AuthModule  
  ],
  exports: [
    HomeModule,
    MoviesModule,
    AuthModule
  ],
  declarations: []
})
export class ViewsModule { }
