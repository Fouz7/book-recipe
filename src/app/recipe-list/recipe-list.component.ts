import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { RecipeBookService } from '../services/recipe-book-service.service';
import { DekstopFilterDialogComponent } from '../dekstop-filter-dialog/dekstop-filter-dialog.component';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
  sidebarVisible2: boolean = false;
  bookRecipes: any[] = [];
  filteredRecipes = [...this.bookRecipes];
  searchText : string = '';
  pageSizeOptions = [8, 16, 48];
  pageSize = 8;
  pageNumber = 1;
  userId = 290;
  categoryId : number | undefined = undefined;
  time : number = 0;
  sortBy : string = 'asc';
  totalItems: number = 1;
  totalPages: number = 1;
  starState: string = 'star_border';
  pagesArray: number[] = [];
  selectedLevelId: number = 0;
  selectedSortOption: string = '';

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

  constructor(
    private recipeBookService: RecipeBookService,
    public dialog: MatDialog
    ) {}


  ngOnInit(): void {
    this.loadBookRecipes();
  }

  loadBookRecipes(): void {
    let params: { pageNumber?: number, pageSize?: number, levelId?: number, userId?: number, sortBy?: string, time?: number, categoryId?: number } = {};
  
    if (this.pageNumber) params.pageNumber = this.pageNumber;
    if (this.pageSize) params.pageSize = this.pageSize;
    if (this.selectedLevelId) params.levelId = this.selectedLevelId;
    if (this.userId) params.userId = this.userId;
    if (this.selectedSortOption) params.sortBy = this.selectedSortOption;
    if (this.time) params.time = this.time;;
    if (this.categoryId) params.categoryId = this.categoryId;
  
    this.recipeBookService.getRecipeList(params).subscribe(data => {
      this.bookRecipes = data.data;
      this.filteredRecipes = [...this.bookRecipes];
      this.totalItems = data.total;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.pagesArray = Array.from({length: this.totalPages}, (_, i) => i + 1);
    });
  }

  filterRecipes(event: Event) {
    event.preventDefault();
    if (this.searchText) {
      this.filteredRecipes = this.bookRecipes.filter(recipe =>
        recipe.recipeName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        recipe.categories?.categoryName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        recipe.levels?.levelName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        recipe.time.toString().includes(this.searchText)
      );
    } else {
      this.filteredRecipes = [...this.bookRecipes];
    }
  }

  openFilterDialog(): void {
    const dialogRef = this.dialog.open(DekstopFilterDialogComponent, {
      position: { top: '145px', left: '58%' },
      width: '420px',
      backdropClass: 'transparent-backdrop',

      data: { 
        selectedLevelId: this.selectedLevelId, 
        levels: this.levels,
        categoryId: this.categoryId,
        category: this.category,
        time: this.time,
        sortOptions: this.sortOptions,
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

  // addFavorite() {
  //   this.recipeBookService.addFavorite(this.recipeId, this.userId).subscribe(response => {
  //     if (response.status === 'CREATED') {
  //       console.log('Favorite added successfully');
  //       this.starState = this.starState === 'star_border' ? 'star' : 'star_border';
  //     } else {
  //       console.log('Failed to add favorite');
  //     }
  //   }, error => {
  //     console.error(error);
  //     alert('An error occurred while adding to favorites');
  //   });
  // }

  clearSearch() {
    this.searchText = '';
    this.filterRecipes(new Event(''));
  }

  filterByLevel() {
    if (this.selectedLevelId) {
      this.filteredRecipes = this.bookRecipes.filter(recipe => recipe.levels?.id === this.selectedLevelId);
    } else {
      this.filteredRecipes = [...this.bookRecipes];
    }
  }

}
