import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeDetailService } from '../services/recipe-detail-service.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
  starState: string = 'star_border';
  recipeDetail: any;
  ingredients: any;

  constructor(
    private route: ActivatedRoute,
    private recipeDetailService: RecipeDetailService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.recipeDetailService.getRecipeDetail(id).subscribe(detail => {
        this.recipeDetail = detail;
        this.ingredients = this.recipeDetail?.data?.ingridient.split(', ');
      });
    }
  }

  toogle(){
    this.starState = this.starState === 'star_border' ? 'star' : 'star_border';
  }

}
