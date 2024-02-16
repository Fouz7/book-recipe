import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeBookService {
  private baseUrl = 'https://mt-springboot.cloudias79.com/api';

  constructor(private http: HttpClient) { }

  getRecipeList(params: { pageNumber?: number, pageSize?: number, recipeName?: string, time?: string, levelId?: number, categoryId?: number, userId?: number, sortBy?: string }): Observable<any> {
    const url = `${this.baseUrl}/book-recipe/book-recipes`;
    let query = '';
    for (const key in params) {
      if (params[key as keyof typeof params] !== undefined && params[key as keyof typeof params] !== null) {
        if (query !== '') {
          query += '&';
        }
        query += `${key}=${params[key as keyof typeof params]}`;
      }
    }
    return this.http.get(`${url}?${query}`);
  }

  getMyRecipes(params: { pageNumber?: number, pageSize?: number, recipeName?: string, time?: string, levelId?: number, categoryId?: number, userId?: number, sortBy?: string}): Observable<any> {
    const url = `${this.baseUrl}/book-recipe/my-recipes`;
    let query = '';
    for (const key in params) {
      if (params[key as keyof typeof params]!== undefined && params[key as keyof typeof params]!== null) {
        if (query!== '') {
          query += '&';
        }
        query += `${key}=${params[key as keyof typeof params]}`;
      }
    }
    return this.http.get(`${url}?${query}`);
  }

  getRecipeDetail(recipeId: string): Observable<any> {
    const url = `${this.baseUrl}/book-recipe/book-recipes/${recipeId}`;
    return this.http.get(url);
  }

  addFavorite(recipeId: number, userId: number): Observable<any> {
    const url = `${this.baseUrl}/book-recipe/book-recipes/${recipeId}/favorites`;
    console.log('url is', url);
    const body = {
      userId: userId
    };
    return this.http.put(url, body);
  }

  getFavoriteRecipes(params: { pageNumber?: number, pageSize?: number, time?: string, levelId?: number, categoryId?: number, userId?: number, sortBy?: string }): Observable<any> {
    const url = `${this.baseUrl}/book-recipe/my-favorite-recipes`;
    let query = '';
    for (const key in params) {
      if (params[key as keyof typeof params] !== undefined && params[key as keyof typeof params] !== null) {
        if (query !== '') {
          query += '&';
        }
        query += `${key}=${params[key as keyof typeof params]}`;
      }
    }
    return this.http.get(`${url}?${query}`);
  }


}

