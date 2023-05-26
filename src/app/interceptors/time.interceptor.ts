import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class TimeInterceptor implements HttpInterceptor {
  constructor() {}

  /* Interceptor che passa un nuovo Header con il Momento in cui è stata fatta la request.
   * Recupera poi in un secondo momento la risposta e ne calcola la differenza di tempistica
   * Scatenare un 'alert' se la chiamata supera 1 secondo di tempo.
   */

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    /* Si effettua un clone di quella che è la richiesta originale;
        Nella nuova richiesta si va ad aggiungere il valore di 'StartTime' */

    const startTime: string = moment().toISOString();

    const requestCopy = request.clone({
      headers: request.headers.set('Start-Time', startTime),
    });

    return next.handle(requestCopy).pipe(
      tap({
        next: () => {
          if (requestCopy.headers.has('Start-Time')) {
            const startTime: string | null =
              requestCopy.headers.get('Start-Time');

            /* Inizio Operazioni con la libreria MomentJS; */
            const startTimeMoment = moment(startTime);
            const difference: number = moment().diff(startTimeMoment);

            /* Stampo e vedo la differenza */
            console.log(difference);

            if (difference > 500) {
              alert('Slow Response!');
            }
          }
        },
      })
    );
  }
}
