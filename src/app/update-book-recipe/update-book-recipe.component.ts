import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditRecipeService } from '../services/edit-recipe.service';

@Component({
  selector: 'app-update-book-recipe',
  templateUrl: './update-book-recipe.component.html',
  styleUrls: ['./update-book-recipe.component.css']
})
export class UpdateBookRecipeComponent implements OnInit {

  recipeId!: number;
  editRecipeForm!: FormGroup;
  editRecipe: any;
  selectedFile: File | undefined;

  constructor(
    private editRecipeService: EditRecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.recipeId = this.route.snapshot.params['recipeId'];
    this.editRecipeService.find(this.recipeId).subscribe((data: any) => {
      this.editRecipe = data.data;
      this.editRecipeForm = this.formBuilder.group({
        categoryId: [this.editRecipe.categories?.categoryId || ''],
        categoryName: [this.editRecipe.categories?.categoryName || '', Validators.required],
        levelId: [this.editRecipe.levels?.levelId || ''],
        levelName: [this.editRecipe.levels?.levelName || '', Validators.required],
        recipeName: [this.editRecipe.recipeName || '', Validators.required],
        imageFileName: [this.editRecipe.imageFilename || '', Validators.required],
        timeCook: [this.editRecipe.timeCook || '', Validators.required],
        ingredient: [this.editRecipe.ingridient || '', Validators.required],
        howToCook: [this.editRecipe.howToCook || '', Validators.required]
      });
    });
  }


  initializeForm() {
    this.editRecipeForm.patchValue({
      categoryId: this.editRecipe.categories?.categoryId || '',
      categoryName: this.editRecipe.categories?.categoryName || '',
      levelId: this.editRecipe.levels?.levelId || '',
      levelName: this.editRecipe.levels?.levelName || '',
      recipeName: this.editRecipe.recipeName || '',
      imageFileName: this.editRecipe.imageFilename || '',
      timeCook: this.editRecipe.timeCook || '',
      ingredient: this.editRecipe.ingredient || '',
      howToCook: this.editRecipe.howToCook || '',
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.editRecipeForm.invalid || !this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('request', JSON.stringify({
      recipeId: this.recipeId,
      categories: {
        categoryId: this.editRecipeForm.value.categoryId,
        categoryName: this.editRecipeForm.value.categoryName
      },
      levels: {
        levelId: this.editRecipeForm.value.levelId,
        levelName: this.editRecipeForm.value.levelName
      },
      recipeName: this.editRecipeForm.value.recipeName,
      timeCook: this.editRecipeForm.value.timeCook,
      ingredient: this.editRecipeForm.value.ingredient,
      howToCook: this.editRecipeForm.value.howToCook
    }));

    this.editRecipeService.updateRecipe(formData).subscribe((res: any) => {
      console.log('Recipe updated successfully!', res);
    });
  }
}
