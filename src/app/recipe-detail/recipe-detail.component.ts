import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeBookService } from '../services/recipe-book-service.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
  starState: string = 'star_border';
  recipeDetail: any;
  ingredients: any;
  recipeId: string = '';
  userId: number = 290;

  constructor(
    private route: ActivatedRoute,
    private recipeBookService: RecipeBookService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.recipeId = id;
      this.recipeBookService.getRecipeDetail(id).subscribe(detail => {
        this.recipeDetail = detail;
        this.ingredients = this.recipeDetail?.data?.ingridient.split(', ');
      });
    }
  }

  addFavorite() {
    this.recipeBookService.addFavorite(this.recipeId, this.userId).subscribe(response => {
      if (response.status === 'CREATED') {
        console.log('Favorite added successfully');
        this.starState = this.starState === 'star_border' ? 'star' : 'star_border';
      } else {
        console.log('Failed to add favorite');
      }
    }, error => {
      console.error(error);
      alert('An error occurred while adding to favorites');
    });
  }

}
