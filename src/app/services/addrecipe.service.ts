import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddrecipeService {
  constructor(private httpClient: HttpClient) {}

  getCategories() {
    return this.httpClient.get(
      `https://mt-springboot.cloudias79.com/api/book-recipe-masters/category-option-lists`
    );
  }

  getLevels() {
    return this.httpClient.get(
      `https://mt-springboot.cloudias79.com/api/book-recipe-masters/level-option-lists`
    );
  }

  add(data: FormData) {
    return this.httpClient.post(
      `https://mt-springboot.cloudias79.com/api/book-recipe/book-recipes`,
      data
    );
  }
}
