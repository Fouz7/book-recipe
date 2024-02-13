import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const userItem = localStorage.getItem('user');
    let user = null;
    let token = null;
  
    if (userItem) {
      user = JSON.parse(userItem);
      token = user && user.data && user.data.token;
    }
  
    console.log('User:', user);
    console.log('Token:', token);
  
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `${user.data.type} ${token}`)
      });
  
      console.log('Modified request:', authReq);
  
      return next.handle(authReq);
    }
  
    return next.handle(req);
  }
}