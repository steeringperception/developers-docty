import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterOperabilityService } from './inter-operability.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    public io: InterOperabilityService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let tk = request.headers.get('apikey');
    if (!!!tk) {
      let token = localStorage.getItem('authToken');
      request = request.clone({
        setHeaders: {
          Authorization: (token || '')
        }
      });
    }
    return next.handle(request);
  }
}
