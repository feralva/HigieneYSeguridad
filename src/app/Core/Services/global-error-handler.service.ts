import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggingService } from './logging.service';
import { GenericAlertMessageService } from './generic-alert-message.service';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService {

  constructor(private injector: Injector, private authService: AuthService) { }

    handleError(error: Error | HttpErrorResponse) {

      const logger = this.injector.get(LoggingService);
      const notifier = this.injector.get(GenericAlertMessageService);

      if(!(error instanceof  HttpErrorResponse)) {

        const message = error.message;
        const stackTrace = error.stack;

        notifier.mostrarMensajeGenerico(message); 

        logger.logError(message, stackTrace); 
      }else{
        if(error.status === 409){

          notifier.mostrarMensajeGenerico(error.error); 

          logger.logError(error.error, error.url); 
        }
      }
    }
}
