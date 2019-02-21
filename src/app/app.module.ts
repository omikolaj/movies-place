
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './components/page-not-found/app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './hoc/layout/layout.component'
import { NavigationModule } from './components/navigation/navigation.module';
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
import { HttpErrorInterceptor } from './error-handlers/http-error.interceptor';
import { ErrorHandlersModule } from './error-handlers/error-handlers.module';
import { ViewsModule } from './views/views.module';
import { PostItDialogModule } from './components/post-it-dialog/post-it-dialog.module';

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
    ViewsModule,
    SharedModule,
    NgxsModule.forRoot([
      PostState,
      MovieState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot({name: "store"}),
    NgxsLoggerPluginModule.forRoot(),
    HttpClientModule,
    ErrorHandlersModule,
    PostItDialogModule    
  ],
  providers: [PostService, HomeService, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
