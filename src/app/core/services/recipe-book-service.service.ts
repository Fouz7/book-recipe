import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environments';

@Injectable({
  providedIn: 'root',
})
export class RecipeBookService {
  constructor(private http: HttpClient) {}

  getRecipeList(params: {
    pageNumber?: number;
    pageSize?: number;
    recipeName?: string;
    time?: string;
    levelId?: number;
    categoryId?: number;
    userId?: number;
    sortBy?: string;
  }): Observable<any> {
    const url = `${environment.apiUrl}/book-recipe/book-recipes`;
    let query = '';
    for (const key in params) {
      if (
        params[key as keyof typeof params] !== undefined &&
        params[key as keyof typeof params] !== null
      ) {
        if (query !== '') {
          query += '&';
        }
        query += `${key}=${params[key as keyof typeof params]}`;
      }
    }
    return this.http.get(`${url}?${query}`);
  }

  getMyRecipes(params: {
    pageNumber?: number;
    pageSize?: number;
    recipeName?: string;
    time?: string;
    levelId?: number;
    categoryId?: number;
    userId?: number;
    sortBy?: string;
  }): Observable<any> {
    const url = `${environment.apiUrl}/book-recipe/my-recipes`;
    let query = '';
    for (const key in params) {
      if (
        params[key as keyof typeof params] !== undefined &&
        params[key as keyof typeof params] !== null
      ) {
        if (query !== '') {
          query += '&';
        }
        query += `${key}=${params[key as keyof typeof params]}`;
      }
    }
    return this.http.get(`${url}?${query}`);
  }

  getRecipeDetail(recipeId: string): Observable<any> {
    const url = `${environment.apiUrl}/book-recipe/book-recipes/${recipeId}`;
    return this.http.get(url);
  }

  addFavorite(recipeId: number, userId: number): Observable<any> {
    const url = `${environment.apiUrl}/book-recipe/book-recipes/${recipeId}/favorites`;
    console.log('url is', url);
    const body = {
      userId: userId,
    };
    return this.http.put(url, body);
  }

  getFavoriteRecipes(params: {
    pageNumber?: number;
    pageSize?: number;
    time?: string;
    levelId?: number;
    categoryId?: number;
    userId?: number;
    sortBy?: string;
  }): Observable<any> {
    const url = `${environment.apiUrl}/book-recipe/my-favorite-recipes`;
    let query = '';
    for (const key in params) {
      if (
        params[key as keyof typeof params] !== undefined &&
        params[key as keyof typeof params] !== null
      ) {
        if (query !== '') {
          query += '&';
        }
        query += `${key}=${params[key as keyof typeof params]}`;
      }
    }
    return this.http.get(`${url}?${query}`);
  }

  deleteMyRecipe(recipeId: number, userId: number): Observable<any> {
    const url = `https://mt-springboot.cloudias79.com/api/book-recipe/book-recipes/${recipeId}?userId=${userId}`;
    const body = {
      userId: userId,
    };
    return this.http.put(url, body);
  }
}
