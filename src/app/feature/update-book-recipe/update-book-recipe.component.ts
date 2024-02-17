import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '@app/core/models/category';
import { Level } from '@app/core/models/level';
import { EditRecipeService } from '@app/core/services/edit-recipe.service';

@Component({
  selector: 'app-update-book-recipe',
  templateUrl: './update-book-recipe.component.html',
  styleUrls: ['./update-book-recipe.component.css'],
})
export class UpdateBookRecipeComponent implements OnInit {

  recipeId!: number;
  editRecipeForm!: FormGroup;
  editRecipe: any;
  userId: number | null = null;
  categoryFood!: Category[];
  levelFood!: Level[];
  files: File[] = [];
  selectedFile: File | undefined;

  constructor(
    private editRecipeService: EditRecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    const userItem = localStorage.getItem('user');
    let user = null;

    if (userItem) {
      user = JSON.parse(userItem);
      this.userId = user && user.data && user.data.id;
    }
  }

  ngOnInit() {
    this.recipeId = Number(this.route.snapshot.params['recipeId']);
    this.editRecipeService.find(this.recipeId).subscribe((data: any) => {
      this.editRecipe = data.data;
      this.editRecipeForm = this.formBuilder.group({
        categoryId: [this.editRecipe.categories?.categoryId || ''],
        categoryName: [this.editRecipe.categories?.categoryName || '', Validators.required],
        levelId: [this.editRecipe.levels?.levelId || ''],
        levelName: [this.editRecipe.levels?.levelName || '', Validators.required],
        userId: [this.userId || '', Validators.required],
        recipeName: [this.editRecipe.recipeName || '', [Validators.required]],
        imageFilename: [this.editRecipe.imageFilename || '', [Validators.required]],
        timeCook: [this.editRecipe.timeCook || '', [Validators.required, Validators.min(1), Validators.pattern(/^[1-9]\d*$/)]],
        ingridient: [this.editRecipe.ingridient || '', [Validators.required, Validators.maxLength(255)]],
        howToCook: [this.editRecipe.howToCook || '', [Validators.required, Validators.maxLength(255)]],
      });

      if (this.editRecipeForm.get('imageFilename')) {
        this.editRecipeForm.get('imageFilename')!.setErrors({ 'required': true });
      }

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

  onSubmit() {
    if (this.editRecipeForm.invalid) {
      return;
    }

    if (!this.files.length) {
      this.snackBar.open("Harap pilih gambar untuk diunggah.", '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000,
        panelClass: 'warning-snackbar'
      });
      return;
    }

    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxFileSize = 1024 * 1024;
    const minFileSize = 0;

    for (const file of this.files) {
      if (!allowedFileTypes.includes(file.type)) {
        this.snackBar.open("Hanya file JPG, JPEG dan PNG yang diizinkan.", '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 2000,
          panelClass: 'warning-snackbar'
        });
        return;
      }
      if (file.size > maxFileSize) {
        this.snackBar.open("Ukuran file terlalu besar. Maksimum 1MB.", '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 2000,
          panelClass: 'warning-snackbar'
        });
        return;
      }
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
      userId: this.userId,
      recipeName: this.editRecipeForm.value.recipeName,
      timeCook: this.editRecipeForm.value.timeCook,
      ingridient: this.editRecipeForm.value.ingridient,
      howToCook: this.editRecipeForm.value.howToCook,
    })], { type: 'application/json' });

    const formData = new FormData();
    formData.append('request', jsonBlob, 'request.json');

    this.editRecipeService.updateRecipe(formData).subscribe((res: any) => {
      let message = "Resep Berhasil Diubah";
      this.router.navigate(['/resep-saya']);

      this.snackBar.open(message, '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000,
        panelClass: 'warning-snackbar'
      });
    });
  }
}
