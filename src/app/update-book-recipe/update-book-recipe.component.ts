import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/category';
import { Level } from '../models/level';
import { EditRecipeService } from '../services/edit-recipe.service';

@Component({
  selector: 'app-update-book-recipe',
  templateUrl: './update-book-recipe.component.html',
  styleUrls: ['./update-book-recipe.component.css'],
})
export class UpdateBookRecipeComponent implements OnInit {

  recipeId!: number;
  editRecipeForm!: FormGroup;
  editRecipe: any;
  categoryFood!: Category[];
  levelFood!: Level[];
  files: File[] = [];
  selectedFile: File | undefined;

  constructor(
    private editRecipeService: EditRecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.recipeId = Number(this.route.snapshot.params['recipeId']);
    this.editRecipeService.find(this.recipeId).subscribe((data: any) => {
      this.editRecipe = data.data;
      this.editRecipeForm = this.formBuilder.group({
        categoryId: [this.editRecipe.categories?.categoryId || ''],
        categoryName: [this.editRecipe.categories?.categoryName || '', Validators.required],
        levelId: [this.editRecipe.levels?.levelId || ''],
        levelName: [this.editRecipe.levels?.levelName || '', Validators.required],
        userId: [this.editRecipe.userId || ''],
        recipeName: [this.editRecipe.recipeName || '', [Validators.required]],
        imageFilename: [this.editRecipe.imageFilename || ''],
        timeCook: [this.editRecipe.timeCook || '', Validators.required],
        ingridient: [this.editRecipe.ingridient || '', Validators.required],
        howToCook: [this.editRecipe.howToCook || '', Validators.required],
      });

      if (this.editRecipe.imageFilename) {
        const currentFile = new File([this.editRecipe.imageFilename], this.editRecipe.imageFilename);
        this.files.push(currentFile);
      }
    });
    this.getCategoryFoodList();
    this.getLevelFoodList();
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  getCategoryFoodList() {
    this.editRecipeService.getCategories().subscribe((res: any) => {
      this.categoryFood = res.data;
    });
  }

  getLevelFoodList() {
    this.editRecipeService.getLevels().subscribe((res: any) => {
      this.levelFood = res.data;
    });
  }

  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table wordcount'
  };

  onSubmit() {
    if (this.editRecipeForm.invalid || !this.files.length) {
      return;
    }

    const jsonBlob = new Blob([JSON.stringify({
      recipeId: this.recipeId,
      categories: {
        categoryId: this.editRecipeForm.value.categoryId,
        categoryName: this.editRecipeForm.value.categoryName
      },
      levels: {
        levelId: this.editRecipeForm.value.levelId,
        levelName: this.editRecipeForm.value.levelName
      },
      userId: 330,
      recipeName: this.editRecipeForm.value.recipeName,
      timeCook: this.editRecipeForm.value.timeCook,
      ingridient: this.editRecipeForm.value.ingridient,
      howToCook: this.editRecipeForm.value.howToCook,
    })], { type: 'application/json' });

    const formData = new FormData();
    formData.append('request', jsonBlob, 'request.json');

    this.editRecipeService.updateRecipe(formData).subscribe((res: any) => {
      console.log('Recipe updated successfully!', res);
      this.router.navigate(['/resep-saya']);
    });
  }
}
