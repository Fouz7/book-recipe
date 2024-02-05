import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface CategoryFoodResponse {
  categoryId: number;
  categoryName: string;
}

export interface LevelFoodResponse {
  levelId: number;
  levelName: string;
}

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
}
