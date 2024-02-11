import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsYWxhIiwiaWF0IjoxNzA3NTg2ODcyLCJleHAiOjE3MDc2NzMyNzJ9.gnlXLb-jOxVzJxkh3CnkCioH_uivMmx5lipVUIUq8cY';

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next.handle(authReq);
  }
}