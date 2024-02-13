import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  add(data: any) {
    return this.httpClient.post(
      `https://mt-springboot.cloudias79.com/api/book-recipe/book-recipes`,
      data
    );
  }

  setUploadImage(data: any) {
    return this.httpClient.post(
      `https://storeapi.gerasim.in/api/Customer/Upload`,
      data
    );
  }

  add2(data: FormData) {
    return this.httpClient.post(
      `https://mt-springboot.cloudias79.com/api/book-recipe/book-recipes`,
      data
    );
  }
}
