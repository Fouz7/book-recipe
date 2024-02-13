import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeBookService } from '../services/recipe-book-service.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  starState: string = 'star_border';
  recipeDetail: any;
  ingredients: any;
  recipeId: number | undefined = undefined;
  userId: number = 290;
  
  constructor(
    private route: ActivatedRoute,
    private recipeBookService: RecipeBookService,
    private snackbar: MatSnackBar,
  ) {}

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (id !== null) {
      this.recipeId = Number(id);
      this.recipeBookService.getRecipeDetail(id).subscribe(detail => {
      this.recipeDetail = detail;
      this.ingredients = this.recipeDetail?.data?.ingridient.split(', ');
      this.starState = this.recipeDetail?.data?.isFavorite ? 'star' : 'star_border';
    });
  }
}

addFavorite() {
  let message = this.recipeDetail?.data?.isFavorite ? 'Berhasil menghapus favorit' : 'Berhasil Ditambahkan ke favorit';
  const recipeId = this.recipeId || 0;
  this.recipeBookService.addFavorite(recipeId, this.userId).subscribe(response => {
    if (response.status === 'CREATED') {
      this.snackbar.open(message, '', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 2000,
        panelClass: 'custom-snackbar'
      });
      this.recipeDetail.data.isFavorite = !this.recipeDetail.data.isFavorite;
      this.starState = this.recipeDetail.data.isFavorite ? 'star' : 'star_border';
    } else {
      console.log('Failed to add favorite');
    }
  }, error => {
    console.error(error);
    alert('An error occurred while adding to favorites');
  });
}

}
