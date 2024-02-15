import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { RecipeBookService } from '../services/recipe-book-service.service';
import { DekstopFilterDialogComponent } from '../dekstop-filter-dialog/dekstop-filter-dialog.component';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FavoriteDialogComponent } from '@app/favorite-dialog/favorite-dialog.component';



@Component({
  selector: 'app-recipe-list',
  templateUrl: './resep-favorit.component.html',
  styleUrl: './resep-favorit.component.css'
})
export class ResepFavoritComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  bookRecipes: any[] = [];
  filteredRecipes = [...this.bookRecipes];
  searchText : string = '';
  pageSizeOptions = [8, 16, 48];
  pageSize = 8;
  pageNumber = 1;
  userId: number | null = null;
  recipeId: number | undefined = undefined;
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
    private confirmationService: ConfirmationService,
    private snackbar: MatSnackBar,
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
  
    if (this.pageNumber) params.pageNumber = this.pageNumber;
    if (this.pageSize) params.pageSize = this.pageSize;
    if (this.selectedLevelId) params.levelId = this.selectedLevelId;
    if (this.userId) params.userId = this.userId;
    if (this.selectedSortOption) params.sortBy = this.selectedSortOption;
    if (this.time) params.time = this.time;;
    if (this.categoryId) params.categoryId = this.categoryId;
    if (this.searchText) params.recipeName = this.searchText;
  
    this.recipeBookService.getFavoriteRecipes(params).subscribe(data => {
      this.bookRecipes = data.data;
      this.filteredRecipes = [...this.bookRecipes];
      this.totalItems = data.total;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.pagesArray = Array.from({length: this.totalPages}, (_, i) => i + 1);

    });
  }

  filterRecipes() {
    this.loadBookRecipes();
  }

  openFilterDialog(): void {
    this.isFiltering = true;
    const dialogRef = this.dialog.open(DekstopFilterDialogComponent, {
      position: { top: '135px', left: '55%' },
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
        this.time = result.time;
        this.selectedSortOption = result.selectedSortOption;
        this.loadBookRecipes();
      }
      this.isFiltering = false;
    });
  }
  

  openFilterDialogMobile(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      position: { top: '175px', left: '27px' },
      width: '100%',
      backdropClass: 'transparent-backdrop',

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

  clearSearch() {
    this.searchText = '';
    this.loadBookRecipes();
  }


  addFavorite(recipeId: number) {
    let message = 'Berhasil Ditambahkan ke favorit';
    if (this.userId === null || this.userId === undefined) {
      console.error('addFavorite error: userId is', this.userId);
      return;
    }
  
    console.log('addFavorite called with', recipeId, this.userId);
    this.recipeBookService.addFavorite(recipeId, this.userId).subscribe(response => {
      const bookRecipe = this.filteredRecipes.find(recipe => recipe.recipeId === recipeId);
      if (bookRecipe) {
        bookRecipe.isFavorite = !bookRecipe.isFavorite;
        this.snackbar.open(message, '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2000,
          panelClass: 'custom-snackbar'
        });
      }
    }, error => {
      console.error('addFavorite error', error);
    });
  }

  removeFavorite(recipeId: number) {
    this.confirmationService.confirm({
      message: `Apakah Anda yakin ingin menghapus resep ini dari favorit?`,
      header: 'Konfirmasi',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.userId === null || this.userId === undefined) return;
        this.recipeBookService.addFavorite(recipeId, this.userId).subscribe(response => {
          const bookRecipe = this.filteredRecipes.find(recipe => recipe.recipeId === recipeId);
          if (bookRecipe) {
            bookRecipe.isFavorite = !bookRecipe.isFavorite;
            const dialogRef = this.dialog.open(FavoriteDialogComponent, {
              panelClass: 'custom-fav-dialog',
            })
          }
        }, error => {
          //i dont know what to do
        });
      },
      reject: (type: ConfirmEventType) => {
        if (type === ConfirmEventType.REJECT) {
          //do nothing
        }
      }
    });
  }
  

  filterByLevel() {
    if (this.selectedLevelId) {
      this.filteredRecipes = this.bookRecipes.filter(recipe => recipe.levels?.id === this.selectedLevelId);
    } else {
      this.filteredRecipes = [...this.bookRecipes];
    }
  }

}
