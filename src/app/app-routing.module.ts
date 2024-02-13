import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddrecipeComponent } from './addrecipe/addrecipe.component';

import { SignupComponent } from './signup/signup.component';
import { FormSigninComponent } from './form-signin/form-signin.component';
import { AuthGuard } from './utils/auth-guard.guard';
// import { HomeComponent } from './home/home.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { HeaderComponent } from './header/header.component';
import { ResepFavoritComponent } from './resep-favorit/resep-favorit.component';

const routes: Routes = [
  { path: '', component: FormSigninComponent },
  //buat nanti di home
  // { path: '', component: HomeComponent, canActivate: [AuthGuard]},
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
  { path: 'tambah-resep', component: AddrecipeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
