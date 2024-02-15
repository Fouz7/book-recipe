import { Component } from '@angular/core';

@Component({
  selector: 'app-my-recipe',
  templateUrl: './my-recipe.component.html',
  styleUrl: './my-recipe.component.css'
})
export class MyRecipeComponent {
  sideBarVisible2: boolean = false;
  myRecipes: any[] = [];
  filteredRecipes = [...this.myRecipes];
  searchText : string = '';
  pageSsizeOptions = [8, 16, 48];
  pageSize = 8;
  pageNumber = 1;
  userId : number | null = null;
  categoryId : number | undefined = undefined;
  time : string = '';
  sortBy : string = 'asc';
  // totalItems
}
