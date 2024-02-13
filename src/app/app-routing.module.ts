import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './signup';
import { AuthGuard } from './_helpers';
// import { HomeComponent } from './home/home.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { HeaderComponent } from './header/header.component';
import { ResepFavoritComponent } from './resep-favorit/resep-favorit.component';

const routes: Routes = [
  { path: 'head', component: HeaderComponent },
  //buat nanti di home
  // { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'signup', component: SignupComponent },
  { path: '', component: LoginComponent },
  { path: 'daftar-resep', component: RecipeListComponent},
  { path: 'detail-resep/:id', component: RecipeDetailComponent },
  { path: 'resep-favorit', component: ResepFavoritComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
