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

      if(!(error instanceof  HttpErrorResponse)) {
        const logger = this.injector.get(LoggingService);
        const notifier = this.injector.get(GenericAlertMessageService);

        let message;
        let stackTrace;
        // Client Error
        
          message = error.message;
          stackTrace = error.stack;
        
        console.log(error)
        notifier.mostrarMensajeGenerico(message); 
      

        // Always log errors
        logger.logError(message, stackTrace); 
      } /* else {
        this.authService.logout()
      } */
    }
}
