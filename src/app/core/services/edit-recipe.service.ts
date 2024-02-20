import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environments';

@Injectable({
  providedIn: 'root',
})
export class EditRecipeService {
  private apiUrl = `${environment.apiUrl}/book-recipe/book-recipes`;

  constructor(private httpClient: HttpClient) {}

  find(recipeId: number): Observable<any> {
    const url = `${this.apiUrl}/${recipeId}`;
    return this.httpClient.get(url);
  }

  updateRecipe(formData: FormData): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.httpClient.put<any>(url, formData);
  }

  getCategories() {
    return this.httpClient.get(
      `${environment.apiUrl}/book-recipe-masters/category-option-lists`
    );
  }

  getLevels() {
    return this.httpClient.get(
      `${environment.apiUrl}/book-recipe-masters/level-option-lists`
    );
  }
}
