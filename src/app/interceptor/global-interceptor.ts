import { CookieService } from 'ngx-cookie-service';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers
                  .set('X-Requested-With', 'XMLHttpRequest')
                  .set('X-XSRF-TOKEN',this.cookieService.get('XSRF-TOKEN')),
      withCredentials:true
                  
    });
    return next.handle(xhr);
  }
}