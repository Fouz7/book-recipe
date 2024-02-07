import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsYWxhIiwiaWF0IjoxNzA3MjkwMjkyLCJleHAiOjE3MDczNzY2OTJ9.eTW3as2Ce5J_a8OqXqDhviKa1jNFPzyQ3xQ_o8Se11w';

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next.handle(authReq);
  }
}