import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileHandle } from '@app/core/models/file-handle.model';
import { CategoryFoodResponse } from '@app/core/models/categoryfoodresponse.model';
import { LevelFoodResponse } from '@app/core/models/levelfoodresponse.model';
import { Router } from '@angular/router';
import { AddrecipeService } from '@app/core/services/addrecipe.service';
import { MatDialog } from '@angular/material/dialog';
import { AddRecipeDialogComponent } from '@app/core/components/add-recipe-dialog/add-recipe-dialog.component';

@Component({
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.component.html',
  styleUrl: './addrecipe.component.css',
})
export class AddrecipeComponent {
  userId: number | null = null;
  submitted: boolean = false;

  constructor(
    private addrecipeService: AddrecipeService,
    private router: Router,
    private dialog: MatDialog
  ) {
    const userItem = localStorage.getItem('user');
    let user = null;

    if (userItem) {
      user = JSON.parse(userItem);
      this.userId = user && user.data && user.data.id;
      console.log(this.userId);

      this.addRecipeForm.controls['userId'].setValue(this.userId);
    }
  }

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
    const selectedFiles: File[] = event.addedFiles;
    const imageUrls = this.addRecipeForm.get('imageUrl') as FormControl;

    const currentImages = imageUrls.value || [];

    for (const file of selectedFiles) {
      if (file.size <= 1048576) {
        const fileHandle: FileHandle = {
          file: file,
        };
        currentImages.push(fileHandle);
      } else {
        // Tampilkan pesan kesalahan jika ukuran gambar melebihi 1 MB
        // Anda juga bisa mengatur pesan kesalahan di FormControl atau FormGroup yang sesuai
        console.log('Gambar yang dibolehkan maks 1 MB');
      }
    }

    imageUrls.setValue(currentImages);
  }

  isFileTooLarge(): boolean {
    return this.files.some((file) => file.size > 1048576); // 1 MB = 1048576 bytes
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);

    const imageUrls = this.addRecipeForm.get('imageUrl') as FormControl;
    const currentImages = imageUrls.value || [];

    const index = currentImages.findIndex(
      (fileHandle: FileHandle) => fileHandle.file === event
    );

    if (index !== -1) {
      currentImages.splice(index, 1);
      imageUrls.setValue(currentImages);
    }
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

  addRecipeForm: FormGroup = new FormGroup({
    recipeName: new FormControl('', Validators.required),
    categories: new FormGroup({
      categoryId: new FormControl('', Validators.required),
      categoryName: new FormControl(''),
    }),
    levels: new FormGroup({
      levelId: new FormControl('', Validators.required),
      levelName: new FormControl(''),
    }),
    userId: new FormControl(this.userId),
    timeCook: new FormControl('', [Validators.required, Validators.min(1)]),
    ingridient: new FormControl('', Validators.required),
    howToCook: new FormControl('', Validators.required),
    imageUrl: new FormControl([]),
  });

  changeCategory(e: any) {
    console.log(e.target.value);
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

    this.addRecipeForm.get('categories')?.setValue({
      categoryId: categoryId,
      categoryName: categoryName,
    });
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

    this.addRecipeForm.get('levels')?.setValue({
      levelId: levelId,
      levelName: levelName,
    });
  }

  addRecipe() {
    this.submitted = true;
    const imageUrlControl = this.addRecipeForm.get('imageUrl');
    if (this.addRecipeForm.valid && this.files.length > 0) {
      console.log(this.addRecipeForm);

      const formRecipes = this.prepareFormData(this.addRecipeForm.value);

      this.addrecipeService.add(formRecipes).subscribe(
        (res: any) => {
          this.openSuccessModal();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
    if (imageUrlControl) {
      imageUrlControl.setErrors({ required: true });
    }
  }

  openSuccessModal(): void {
    const recipeNameControl = this.addRecipeForm.get('recipeName');
    if (recipeNameControl) {
      const recipeName = recipeNameControl.value;
      const dialogRef = this.dialog.open(AddRecipeDialogComponent, {
        disableClose: true,
        panelClass: 'custom-fav-dialog',
        data: { recipeName: recipeName },
      });

      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['/daftar-resep']);
      });
    }
  }

  prepareFormData(addRecipeForm2Value: any): FormData {
    const formData = new FormData();

    formData.append(
      'request',
      new Blob([JSON.stringify(addRecipeForm2Value)], {
        type: 'application/json',
      })
    );

    for (let i = 0; i < addRecipeForm2Value.imageUrl.length; i++) {
      formData.append(
        'file',
        addRecipeForm2Value.imageUrl[i].file,
        addRecipeForm2Value.imageUrl[i].file.name
      );
    }
    return formData;
  }

  resetForm() {
    this.addRecipeForm.reset();
  }
}
