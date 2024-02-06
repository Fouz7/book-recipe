import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditRecipeService {

  private apiUrl = 'https://mt-springboot.cloudias79.com/api/book-recipe/book-recipes';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  }

  constructor(private httpClient: HttpClient) { }

  find(recipeId: number): Observable<any> {
    const url = `${this.apiUrl}/${recipeId}`;
    return this.httpClient.get(url);
  }

  updateRecipe(formData: FormData): Observable<any> {
    return this.httpClient.put<any>(this.apiUrl, formData, this.httpOptions);
  }
}
