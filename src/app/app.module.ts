import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AppRoutingModule } from './app-routing.module';
import { QuillConfigModule, QuillModule } from 'ngx-quill';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { UpdateBookRecipeComponent } from './feature/update-book-recipe/update-book-recipe.component';
import { SignupComponent } from './feature/signup';
import { RecipeDetailComponent } from './feature/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './feature/recipe-list/recipe-list.component';
import { FilterDialogComponent } from './core/components/filter-dialog/filter-dialog.component';
import { DekstopFilterDialogComponent } from './core/components/dekstop-filter-dialog/dekstop-filter-dialog.component';
import { ResepFavoritComponent } from './feature/resep-favorit/resep-favorit.component';
import { FormSigninComponent } from './feature/form-signin/form-signin.component';
import { FavoriteDialogComponent } from './core/components/favorite-dialog/favorite-dialog.component';
import { MyRecipeComponent } from './feature/my-recipe/my-recipe.component';
import { AddrecipeComponent } from './feature/addrecipe/addrecipe.component';
import { ConfirmationDialogComponent } from './core/components/delete-dialog/confirmationdialog.component';
import { DeleteDialogSuccessComponent } from './core/components/delete-dialog-success/delete-dialog-success.component';
import { AddRecipeDialogComponent } from './core/components/add-recipe-dialog/add-recipe-dialog.component';
import { UpdateRecipeDialogComponent } from './core/components/update-recipe-dialog/update-recipe-dialog.component';

import { ConfirmationService } from 'primeng/api';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptor } from './core/utils/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UpdateBookRecipeComponent,
    FormSigninComponent,
    SignupComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    FilterDialogComponent,
    DekstopFilterDialogComponent,
    ResepFavoritComponent,
    FavoriteDialogComponent,
    MyRecipeComponent,
    AddrecipeComponent,
    ConfirmationDialogComponent,
    DeleteDialogSuccessComponent,
    AddRecipeDialogComponent,
    UpdateRecipeDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    FlexLayoutModule,
    FormsModule,
    MatMenuModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    NgbModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    MatDialogModule,
    SidebarModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    NgxDropzoneModule,
    ConfirmDialogModule,
    QuillModule.forRoot(),
    NgxDropzoneModule,
    MatGridListModule,
    QuillConfigModule.forRoot({
      modules: {
        syntax: false,
        toolbar: [
          [
            'bold',
            'italic',
            'underline',
            'link',
            'blockquote',
            'code-block',
            { list: 'bullet' },
          ],
        ],
      },
    }),
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    [ConfirmationService],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
