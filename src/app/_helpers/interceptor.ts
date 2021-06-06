import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// import { ErrorDialogService } from 'src/app/shared/error-dialog/errordialog.service';
// import { TransporterService } from 'src/app/shared/transporter/transporter';

@Injectable()
export class InterceptorProvider implements HttpInterceptor {

  constructor() { }

  // Intercepts all HTTP requests!
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('auth_deliver_admin');
      const language: string = localStorage.getItem('language') || 'en';
    if (token && request.url.indexOf('https://ipapi') < 0) {
      request = request.clone({ headers: request.headers.set('Authorization','bearer ' + token) });
    }


    if (!request.headers.has('Content-Type')) {
      // console.log(request, 'Updated content type');
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    if (request.headers.get('Content-Type') === 'multipart/form-data') {
      // alert('delete content type');
      // For some reason asp.net core responds 415 when there is a content type specified. Weired!!! so I killed it
      request = request.clone({ headers: request.headers.delete('Content-Type')});
    }

    if (!request.headers.has('Accept-Language')) {
      request = request.clone({ headers: request.headers.set('Accept-Language', language) });
    }


    /*if (navigator.onLine !== undefined) {
        if (navigator.onLine === false) {
            let data = {};
            data = {
                reason: 'No Internet connection found',
                status: 404
            };
            this.errorDialogService.openDialog(data);
            return throwError({
                status: 404,
                message: 'No Internet connection found'
            });
        }
    }*/

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('There was an error', error);
        if (error.status === 500) {
          let data = {};
          data = {
            reason: error && error.error.reason ? error.error.reason : error.message,
            status: error.status
          };
          // this.errorDialogService.openDialog(data);
        }
        if (error.status === 401) {
          // this.transporter.sendMessage({type: 'sessionExpired', data: true});
        }
        return throwError(error);
      })
    );

  }

}
