
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injector, Injectable, InjectionToken } from '@angular/core';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PostService } from './services/post/post.service';
import { HomeService } from './services/home/home.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MovieState } from './store/state/movie.state';
import { MoviesModule } from './views/movies/movies.module';
import { HttpErrorInterceptor } from './error-handlers/http-error.interceptor';
import { ErrorHandlersModule } from './error-handlers/error-handlers.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    PageNotFoundComponent  
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
    HttpClientModule,
    ErrorHandlersModule
  ],
  providers: [PostService, HomeService, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
