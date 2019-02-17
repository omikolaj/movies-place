import { NgModule, InjectionToken, Injectable, ErrorHandler, Injector } from '@angular/core';
import * as Rollbar from 'rollbar';
import { CommonModule } from '@angular/common';

const rollbarConfig = {
  accessToken: '0fb7936424b14400af96c9c6d74c4fbd',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

@Injectable()
export class RollbarErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(err:any) : void {
    var rollbar = this.injector.get(RollbarService);
    rollbar.error(err.originalError || err);
  }
}

export function rollbarFactory() {
    return new Rollbar(rollbarConfig);
}

export const RollbarService = new InjectionToken<Rollbar>('rollbar');

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
  { provide: ErrorHandler, useClass: RollbarErrorHandler },
  { provide: RollbarService, useFactory: rollbarFactory }
  ]
})
export class ErrorHandlersModule { }
