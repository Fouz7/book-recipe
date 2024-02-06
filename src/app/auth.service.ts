import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from './app.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://mt-springboot.cloudias79.com/api/user-management/users/signin';

  constructor(private http: HttpClient) { }

  signIn(username: string, password: string): Observable<AuthResponse> {
    const requestBody = {
      username: username,
      password: password
    };

    return this.http.post<AuthResponse>(this.apiUrl, requestBody);
  }
}
