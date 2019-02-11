import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './hoc/layout/layout.component'
import { NavigationModule } from './components/navigation/navigation.module';
import { HomeModule } from './views/home/home.module';
import { SharedModule } from './shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { PostState } from './store/state/post.state';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from './services/post/post.service';
import { HomeService } from './services/home/home.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MovieState } from './store/state/movie.state';
import { MoviesModule } from './views/movies/movies.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    PageNotFoundComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,        
    NavigationModule,
    HomeModule,
    MoviesModule,
    SharedModule,
    NgxsModule.forRoot([
      PostState,
      MovieState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot({name: "store"}),
    NgxsLoggerPluginModule.forRoot(),
    HttpClientModule
  ],
  providers: [PostService, HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
