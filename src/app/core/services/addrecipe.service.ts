import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AddrecipeService {
  constructor(private httpClient: HttpClient) {}

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

  add(data: FormData) {
    return this.httpClient.post(
      `${environment.apiUrl}/book-recipe/book-recipes`,
      data
    );
  }
}
