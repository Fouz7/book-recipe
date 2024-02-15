import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateBookRecipeComponent } from './update-book-recipe/update-book-recipe.component';

  // Rute untuk update recipe
import { SignupComponent } from './signup/signup.component';
import { FormSigninComponent } from './form-signin/form-signin.component';
import { AuthGuard } from './utils/auth-guard.guard';
// import { HomeComponent } from './home/home.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { HeaderComponent } from './header/header.component';
import { ResepFavoritComponent } from './resep-favorit/resep-favorit.component';
import { MyRecipeComponent } from './my-recipe/my-recipe.component';

const routes: Routes = [
  { path: '', component: FormSigninComponent },
  //buat nanti di home
  // { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'signup', component: SignupComponent },
  { path: 'daftar-resep', component: RecipeListComponent, canActivate: [AuthGuard]},
  { path: 'resep-saya', component: MyRecipeComponent, canActivate: [AuthGuard]},
  { path: 'detail-resep/:id', component: RecipeDetailComponent, canActivate: [AuthGuard]},
  { path: 'update-recipe/:recipeId', component: UpdateBookRecipeComponent },
  { path: 'resep-favorit', component: ResepFavoritComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
