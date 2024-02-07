import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditRecipeService {

  private apiUrl = 'https://mt-springboot.cloudias79.com/api/book-recipe/book-recipes';

  constructor(private httpClient: HttpClient) { }

  find(recipeId: number): Observable<any> {
    const url = `${this.apiUrl}/${recipeId}`;
    return this.httpClient.get(url);
  }

  updateRecipe(formData: FormData): Observable<any> {
    const url = `${this.apiUrl}`;
    const headers = new HttpHeaders();
    return this.httpClient.put<any>(url, formData);
  }
}
