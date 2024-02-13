import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsYWxhIiwiaWF0IjoxNzA3NzUyMTY3LCJleHAiOjE3MDc4Mzg1Njd9.CfyhsJaZmmkDQObyzsT25670M2OV0__DApteLRib6iQ';

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next.handle(authReq);
  }
}