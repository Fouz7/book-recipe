import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmationService} from 'primeng/api';
import { RecipeBookService } from '../../core/services/recipe-book-service.service';
import { 
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FavoriteDialogComponent } from '@app/core/components/favorite-dialog/favorite-dialog.component';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  imageLoaded: boolean = false;
  starState: string = 'star_border';
  recipeDetail: any;
  ingredients: any;
  howToCook: any;
  recipeId: number | undefined = undefined;
  userId: number | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private recipeBookService: RecipeBookService,
    private confirmationService: ConfirmationService,
    private snackbar: MatSnackBar,
    private location: Location,
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
  const id = this.route.snapshot.paramMap.get('id');
  if (id !== null) {
      this.imageLoaded = false;
      this.recipeId = Number(id);
      this.recipeBookService.getRecipeDetail(id).subscribe(detail => {
      this.recipeDetail = detail;
      this.ingredients = this.recipeDetail?.data?.ingridient;
      this.howToCook = this.recipeDetail?.data?.howToCook;
      this.starState = this.recipeDetail?.data?.isFavorite ? 'star' : 'star_border';
    });
  }
}

goBack(): void {
  this.location.back();
}

addFavorite() {
  let message = 'Berhasil Ditambahkan ke favorit';
  if (this.userId !== null && this.recipeId !== undefined) {
    const userId = this.userId;
    this.recipeBookService.addFavorite(this.recipeId, userId).subscribe(response => {
      if (response.status === 'CREATED') {
        this.snackbar.open(message, '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2000,
          panelClass: 'custom-snackbar'
        });

        if (this.recipeDetail && this.recipeDetail.data) {
          this.recipeDetail.data.isFavorite = true;
        }
      } else {
        console.log('Failed to add favorite');
      }
    }, error => {
      console.error(error)
      alert('An error occurred while adding to favorites');
    });
  } else {
    console.error('userId is null');
  }
}

removeFavorite() {
  this.confirmationService.confirm({
    message: 'Are you sure that you want to remove this recipe from favorites?',
    accept: () => {
      if (this.userId === null || this.recipeId === undefined) return;
      this.recipeBookService.addFavorite(this.recipeId, this.userId).subscribe(response => {
        const dialogRef = this.dialog.open(FavoriteDialogComponent, {
          panelClass: 'custom-fav-dialog',
        })
        this.recipeDetail.data.isFavorite = false;
      })
    }
  });
  }
}