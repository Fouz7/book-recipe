import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsYWxhIiwiaWF0IjoxNzA3NzA4NzgzLCJleHAiOjE3MDc3OTUxODN9.hoPfzR1A9h8aRft4aAhcK1SkjXrG_W0WaMRMDjWXJBY';

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next.handle(authReq);
  }
}