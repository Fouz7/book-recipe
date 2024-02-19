import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateBookRecipeComponent } from './feature/update-book-recipe/update-book-recipe.component';
import { AddrecipeComponent } from './feature/addrecipe/addrecipe.component';
import { SignupComponent } from './feature/signup';
import { FormSigninComponent } from './feature/form-signin/form-signin.component';
import { AuthGuard } from './core/utils/auth-guard.guard';
import { RecipeDetailComponent } from './feature/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './feature/recipe-list/recipe-list.component';
import { ResepFavoritComponent } from './feature/resep-favorit/resep-favorit.component';
import { MyRecipeComponent } from './feature/my-recipe/my-recipe.component';

const routes: Routes = [
  { path: '', component: FormSigninComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: 'resep-saya',
    component: MyRecipeComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'update-recipe/:recipeId',
    component: UpdateBookRecipeComponent
  },

  {
    path: 'daftar-resep',
    component: RecipeListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'detail-resep/:id',
    component: RecipeDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'resep-favorit',
    component: ResepFavoritComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tambah-resep',
    component: AddrecipeComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
