import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor() {}

  /* Interceptor pensato per aggiungere ad ogni RequestHttp un Header contenente un Token di autenticazione */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    /*Si effettua un clone di quella che è la richiesta originale */
    /* Nella nuova richiesta si va ad aggiungere N nuovi Headers a seconda delle esigenze */

    const requestCopy = request.clone({
      headers: request.headers.set('Example-Token', 'CiaoSonoMatteo'),
    });

    /* Si va infine a 'sostituire' la richiesta antecedente con quella appena creata e modificata */
    return next.handle(requestCopy);
  }
}
