import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
 } from '@angular/common/http';
import { Observable, throwError, iif, timer } from 'rxjs';
import { catchError, retryWhen, delayWhen } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { RollbarService } from './error-handlers.module';
import { RequestError } from '../models/requesterror.model';
 
 @Injectable({
   providedIn: 'root'
 })
 export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retryWhen((errors) => {
          return errors.pipe(
            delayWhen((error, i) => {
              if(i != 3){
                console.log(`Sometheing went wrong connecting to the server. Retrying 3 times. Attempting: ${i + 1}...`);
              }
              return iif(() => i + 1 >=4,
                throwError(error),
                timer(2000)
              )
            })
          )
        }),
        catchError((error: HttpErrorResponse) => {
          const rollbar = this.injector.get(RollbarService)
          let errorMessage: RequestError = null;
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = {
              errorResponse: `Error: ${error.error.message}`
            };
          } else {
            // server-side error
            errorMessage = {
              errorStatus: `Error Code: ${error.status}`,
              errorResponse : `Message: ${error.message}`
            };
          }
          //window.alert(errorMessage);
          // Enable for deployment
          //rollbar.error(error);
          return throwError(errorMessage);
        })
      )
  }
 }