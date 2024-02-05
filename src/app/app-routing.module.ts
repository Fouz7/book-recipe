import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateBookRecipeComponent } from './update-book-recipe/update-book-recipe.component';

const routes: Routes = [
  // Rute untuk update recipe
  { path: 'update-recipe/:recipeId', component: UpdateBookRecipeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
