import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/category';
import { EditRecipe } from '../models/edit-recipe';
import { Level } from '../models/level';
import { EditRecipeService } from '../services/edit-recipe.service';

@Component({
  selector: 'app-update-book-recipe',
  templateUrl: './update-book-recipe.component.html',
  styleUrls: ['./update-book-recipe.component.css']
})
export class UpdateBookRecipeComponent implements OnInit {

  recipeId!: number;
  editRecipe!: EditRecipe;
  form!: FormGroup;

  constructor(
    private editRecipeService: EditRecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.recipeId = this.route.snapshot.params['recipeId'];
    this.editRecipeService.find(this.recipeId).subscribe((data: EditRecipe) => {
      this.editRecipe = data;
      this.initializeForm();
    });
  }

  initializeForm() {
    this.form = new FormGroup({
      categoryId: new FormControl(this.editRecipe.categories?.categoryId || '', [Validators.required]),
      levelId: new FormControl(this.editRecipe.levels?.levelId || '', [Validators.required]),
      recipeName: new FormControl(this.editRecipe.recipeName || '', [Validators.required]),
      imageFileName: new FormControl('', [Validators.required]), // Tentukan cara menangani file gambar
      timeCook: new FormControl(this.editRecipe.timeCook || '', [Validators.required]),
      ingredient: new FormControl(this.editRecipe.ingredient || '', [Validators.required]),
      howToCook: new FormControl(this.editRecipe.howToCook || '', [Validators.required]),
    });
  }

  // Handle file input event
  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files && files.length > 0) {
      // Lakukan sesuatu dengan file yang dipilih
    }
  }

  // Handle form submission
  onSubmit() {
    if (this.form.invalid) {
      // Jika formulir tidak valid, berhenti di sini
      return;
    }
    // Formulir valid, lanjutkan dengan memperbarui resep
    this.editRecipeService.updateRecipe(this.recipeId, this.form.value).subscribe((res: any) => {
      console.log('Post berhasil diperbarui!');
    });
  }
}
