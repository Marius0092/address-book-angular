import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  constructor() {}

  // Interceptor pensato per aggiungere ad ogni chiamata l'url comune assets/json

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(request.url);

    const commonUrl: string = 'assets/json/';

    const requestCopy = request.clone({
      url: commonUrl + request.url,
    });

    /* Si va infine a 'sostituire' la richiesta antecedente con quella appena creata e modificata */
    return next.handle(requestCopy);
  }
}
