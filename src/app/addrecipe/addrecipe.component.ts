import { Component } from '@angular/core';
import { AddrecipeService } from '../services/addrecipe.service';
import { FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';
import { FileHandle } from '../model/file-handle.model';
import { AddRecipe } from '../model/addrecipe.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryFoodResponse } from '../model/categoryfoodresponse.model';
import { LevelFoodResponse } from '../model/levelfoodresponse.model';

@Component({
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.component.html',
  styleUrl: './addrecipe.component.css',
})
export class AddrecipeComponent {
  constructor(private addrecipeService: AddrecipeService) {}

  categoryFood!: CategoryFoodResponse[];
  levelFood!: LevelFoodResponse[];

  ngOnInit() {
    this.getCategoryFoodList();
    this.getLevelFoodList();
  }

  files: File[] = [];

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    // this.AddRecipeForm.imageUrl.push(...event.addedFiles);
    const selectedFiles: File[] = event.addedFiles;
    for (const file of selectedFiles) {
      const fileHandle: FileHandle = {
        file: file,
      };
      this.AddRecipeForm.imageUrl.push(fileHandle);
    }
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  getCategoryFoodList() {
    this.addrecipeService.getCategories().subscribe((res: any) => {
      this.categoryFood = res.data;
    });
  }

  getLevelFoodList() {
    this.addrecipeService.getLevels().subscribe((res: any) => {
      this.levelFood = res.data;
    });
  }

  AddRecipeForm: AddRecipe = {
    recipeName: '',
    categories: {
      categoryId: '',
      categoryName: '',
    },
    levels: {
      levelId: '',
      levelName: '',
    },
    userId: '372',
    timeCook: '',
    ingridient: '',
    howToCook: '',
    imageUrl: [],
  };

  changeCategory(e: any) {
    const categoryId = e.target.value;
    let categoryName = '';

    switch (categoryId) {
      case '0':
        categoryName = 'Lunch';
        break;
      case '1':
        categoryName = 'Breakfast';
        break;
      case '2':
        categoryName = 'Dinner';
        break;
      case '3':
        categoryName = 'Snack';
        break;
      case '7':
        categoryName = 'Lunch';
        break;
      case '8':
        categoryName = 'Lunch';
        break;
      default:
        categoryName = '';
    }

    this.AddRecipeForm.categories = {
      categoryId: categoryId,
      categoryName: categoryName,
    };
  }

  changeLevel(e: any) {
    const levelId = e.target.value;
    let levelName = '';

    switch (levelId) {
      case '0':
        levelName = 'Master Chef';
        break;
      case '1':
        levelName = 'Hard';
        break;
      case '2':
        levelName = 'Medium';
        break;
      case '3':
        levelName = 'Easy';
        break;
      case '4':
        levelName = 'Master Chef';
        break;
      default:
        levelName = '';
    }

    this.AddRecipeForm.levels = {
      levelId: levelId,
      levelName: levelName,
    };
  }

  onFileSelected(event: any) {
    console.log(event.target.files[0]);
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
      };

      this.AddRecipeForm.imageUrl.push(fileHandle);
    }
  }

  addRecipe(recipeForm: NgForm) {
    console.log(this.AddRecipeForm);

    const formRecipes = this.prepareFormData(this.AddRecipeForm);

    this.addrecipeService.add2(formRecipes).subscribe(
      (res: any) => {
        recipeForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  prepareFormData(AddRecipeForm: AddRecipe): FormData {
    const formData = new FormData();

    formData.append(
      'request',
      new Blob([JSON.stringify(AddRecipeForm)], { type: 'application/json' })
    );

    for (var i = 0; i < AddRecipeForm.imageUrl.length; i++) {
      formData.append(
        'file',
        AddRecipeForm.imageUrl[i].file,
        AddRecipeForm.imageUrl[i].file.name
      );
    }
    return formData;
  }
}
