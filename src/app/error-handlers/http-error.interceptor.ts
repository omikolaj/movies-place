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
import { RequestError } from '../models/requesterror.model';
import { Store } from '@ngxs/store';
import * as actions from '../store/actions/auth.actions';
 
 @Injectable({
   providedIn: 'root'
 })
 export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private store: Store) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retryWhen((errors) => {          
          return errors.pipe(
            delayWhen((error, i) => {
              console.log(`Are error headers null: ${error.headers == null}`)
              if(error.headers != null && error.status == 401 && i == 1){
                console.log(`Headers contain token-expired: ${error.headers.get("token-expired") != null}`);
                if(error.headers.get("token-expired")){
                  console.log("Trying to refresh the token");
                  return this.store.dispatch(new actions.RefreshToken());
                }            
              }
              if(i != 1){
                console.log(`Sometheing went wrong connecting to the server. Retrying...`);                
              }
              return iif(() => i + 1 >= 2,
                throwError(error),
                timer(2000)
              )
            })
          )
        }),
        catchError((error: HttpErrorResponse) => {          
          let errorMessage: RequestError = null;
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = {
              errorResponse: `Error: ${error.error.message}`
            };
          } else {
            //server-side error
            errorMessage = {
              errorStatus: `Error Code: ${error.status}`,
              errorResponse : `Message: ${error.message}`,
            };            
          }
          return throwError(errorMessage);          
        })
      )
  }
 }