import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const userItem = localStorage.getItem('user');
    let user = null;

    if (userItem) {
      user = JSON.parse(userItem);
    }

    if (user && user.data && user.data.token) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}