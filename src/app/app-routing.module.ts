import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddrecipeComponent } from './feature/addrecipe/addrecipe.component';

import { SignupComponent } from './feature/signup/signup.component';
import { FormSigninComponent } from './feature/form-signin/form-signin.component';
import { AuthGuard } from './core/utils/auth-guard.guard';
import { RecipeDetailComponent } from './feature/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './feature/recipe-list/recipe-list.component';
import { ResepFavoritComponent } from './feature/resep-favorit/resep-favorit.component';

const routes: Routes = [
  { path: '', component: FormSigninComponent },
  { path: 'signup', component: SignupComponent },
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
