import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleListModule } from './views/article-list/article-list.module';
import { LayoutComponent } from './hoc/layout/layout.component'
import { NavigationModule } from './components/navigation/navigation.module';
import { HomeModule } from './views/home/home.module';
import { SharedModule } from './shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { ArticleState } from './store/state/article.state';
import { HttpClientModule } from '@angular/common/http';
import { ArticleService } from './services/article/article.service';
import { HomeService } from './services/home/home.service';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    ArticleListModule,
    NavigationModule,
    HomeModule,
    SharedModule,
    NgxsModule.forRoot([
      ArticleState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot({name: "store"}),
    NgxsLoggerPluginModule.forRoot(),
    HttpClientModule
  ],
  providers: [ArticleService, HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
