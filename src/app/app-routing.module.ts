import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AddrecipeComponent } from './addrecipe/addrecipe.component';

const routes: Routes = [
  { path: 'tambah-resep', component: AddrecipeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
