import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeDetailService {
  constructor(private http: HttpClient) { }

  getRecipeDetail(id: string): Observable<any> {
    const url = `https://mt-springboot.cloudias79.com/api/book-recipe/book-recipes/${id}`;
    return this.http.get(url);
  }
}