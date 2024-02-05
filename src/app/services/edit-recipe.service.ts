import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { EditRecipe } from '../models/edit-recipe';
import { Level } from '../models/level';

@Injectable({
  providedIn: 'root'
})
export class EditRecipeService {

  private apiUrl = 'https://mt-springboot.cloudias79.com/api/book-recipe/book-recipes';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  find(recipeId: number): Observable<any>{
    const url = `${this.apiUrl}/${recipeId}`;
    return this.httpClient.get(url)
  }

  updateRecipe(recipeId: number, editRecipe: EditRecipe): Observable<any> {
    const url = `${this.apiUrl}/${recipeId}`;
    return this.httpClient.put(url, JSON.stringify(editRecipe), this.httpOptions);
  }
}
