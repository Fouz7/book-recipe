import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DekstopFilterDialogComponent } from '@app/dekstop-filter-dialog/dekstop-filter-dialog.component';
import { FilterDialogComponent } from '@app/filter-dialog/filter-dialog.component';
import { RecipeBookService } from '@app/services/recipe-book-service.service';

@Component({
  selector: 'app-my-recipe',
  templateUrl: './my-recipe.component.html',
  styleUrl: './my-recipe.component.css'
})
export class MyRecipeComponent implements OnInit {
  sideBarVisible2: boolean = false;
  myRecipes: any[] = [];
  filteredRecipes = [...this.myRecipes];
  searchText : string = '';
  pageSizeOptions = [8, 16, 48];
  pageSize = 8;
  pageNumber = 1;
  userId : number | null = null;
  categoryId : number | undefined = undefined;
  time : string = '';
  sortBy : string = 'asc';
  totalItems: number = 1;
  totalPages: number = 1;
  starState: string = 'star_border';
  pagesArray: number[] = [];
  selectedLevelId: number = 0;
  selectedSortOption: string = '';
  isFiltering = false;

  levels = [
    {id: 3, name: 'Easy'},
    {id: 2, name: 'Medium'},
    {id: 1, name: 'Hard'},
    {id: 4, name: 'Master Chef'}
  ];

  category = [
    {id: 0, name: 'Lunch'},
    {id: 1, name: 'Breakfast'},
    {id: 2, name: 'Dinner'},
    {id: 3, name: 'Snack'},
  ];

  sortOptions = [
    {value: 'recipeName,asc', viewValue: 'Nama Resep (A-Z)'},
    {value: 'recipeName,desc', viewValue: 'Nama Resep (Z-A)'},
    {value: 'timeCook,asc', viewValue: 'Waktu Memasak (A-Z)'},
    {value: 'timeCook,desc', viewValue: 'Waktu Memasak (Z-A)'}
  ];

  sortTime = [
    {value: '0', viewValue: 'All'},
    {value: '0-30', viewValue: 'O-30 menit'},
    {value: '30-60', viewValue: '31-60 menit'},
    {value: '60', viewValue: '> 60'},
  ];

  constructor(
    private recipeBookService: RecipeBookService,
    public dialog: MatDialog
  ) {
    const userItem = localStorage.getItem('user');
    let user = null;

    if (userItem) {
      user = JSON.parse(userItem);
      this.userId = user && user.data && user.data.id;
    }
  }

  ngOnInit(): void {
    this.loadBookRecipes();
  }

  loadBookRecipes(): void {
    let params: { pageNumber?: number, pageSize?: number, levelId?: number, userId?: number, sortBy?: string, time?: string, categoryId?: number, recipeName?: string } = {};

    if ( this.pageNumber) params.pageNumber = this.pageNumber;
    if ( this.pageSize) params.pageSize = this.pageSize;
    if ( this.selectedLevelId) params.levelId = this.selectedLevelId;
    if ( this.userId) params.userId = this.userId;
    if ( this.sortBy) params.sortBy = this.sortBy;
    if ( this.time) params.time = this.time;
    if ( this.categoryId) params.categoryId = this.categoryId;
    if ( this.searchText) params.recipeName = this.searchText;

    this.recipeBookService.getMyRecipes(params).subscribe(data => {
      this.myRecipes = data.data;
      this.filteredRecipes = [...this.myRecipes];
      this.totalItems = data.total;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.pagesArray = Array.from({ length: this.totalPages}, (_, i) => i + 1);
    });
  }

  filterRecipes() {
    this.loadBookRecipes();
  }

  openFilterDialog(): void {
    this.isFiltering = true;
    const dialogRef = this.dialog.open(DekstopFilterDialogComponent, {
      position: { top: '142px', left: '58%' },
      width: 'auto',
      backdropClass: 'dialog',

      data: {
        selectedLevelId: this.selectedLevelId,
        levels: this.levels,
        categoryId: this.categoryId,
        category: this.category,
        sortOptions: this.sortOptions,
        time: this.time,
        sortTime: this.sortTime,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedLevelId = result.selectedLevelId;
        this.categoryId = result.categoryId;
        this.selectedSortOption = result.selectedSortOption;
        this.time = result.time;
        this.loadBookRecipes();
      }
      this.isFiltering = false;
    });
  }

  openFilterDialogMobile(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      position: { top: '175px', left: '27px' },
      width: '100%',
      backdropClass: 'dialog',


      data: {
        selectedLevelId: this.selectedLevelId,
        levels: this.levels,
        categoryId: this.categoryId,
        category: this.category,
        time: this.time,
        sortTime: this.sortTime,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedLevelId = result.selectedLevelId;
        this.categoryId = result.categoryId;
        this.time = result.time;
        this.loadBookRecipes();
      }
    });
  }

  changePageSize(newSize: number): void {
    setTimeout(() => window.scrollTo(0, 0), 0);
    this.pageSize = newSize;
    this.pageNumber = 1;
    this.loadBookRecipes();
  }

  changePage(newPage: number): void {
    setTimeout(() => window.scrollTo(0, 0), 0);
    this.pageNumber = newPage;
    this.loadBookRecipes();
  }

  addFavorite(recipeId: number) {
    if (this.userId === null || this.userId === undefined) {
      console.error('addFavorite error: userId is', this.userId);
      return;
    }

    console.log('addFavorite called with', recipeId, this.userId);
    this.recipeBookService.addFavorite(recipeId, this.userId).subscribe(response => {
      const bookRecipe = this.filteredRecipes.find(recipe => recipe.recipeId === recipeId);
      if (bookRecipe) {
        bookRecipe.isFavorite = !bookRecipe.isFavorite;
      }
    }, error => {
      console.error('addFavorite error', error);
    });
  }

  removeFavorite(recipeId: number) {
    if (this.userId === null || this.userId === undefined) {
      console.error('addFavorite error: userId is', this.userId);
      return;
    }

    console.log('addFavorite called with', recipeId, this.userId);
    this.recipeBookService.addFavorite(recipeId, this.userId).subscribe(response => {
      const bookRecipe = this.filteredRecipes.find(recipe => recipe.recipeId === recipeId);
      if (bookRecipe) {
        bookRecipe.isFavorite = !bookRecipe.isFavorite;
        alert('Berhasil menghapus favorit');
      }
    }, error => {
      console.error('addFavorite error', error);
    });
  }

  clearSearch() {
    this.searchText = '';
    this.loadBookRecipes();
  }

  filterByLevel() {
    if (this.selectedLevelId) {
      this.filteredRecipes = this.myRecipes.filter(recipe => recipe.levels?.id === this.selectedLevelId);
    } else {
      this.filteredRecipes = [...this.myRecipes];
    }
  }
}
