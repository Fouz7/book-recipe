import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmationService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './signup/login.component';
import { fakeBackendProvider } from './_helpers';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DekstopFilterDialogComponent } from './dekstop-filter-dialog/dekstop-filter-dialog.component';
import { ResepFavoritComponent } from './resep-favorit/resep-favorit.component';
import { AuthInterceptor } from './utils/auth.interceptor';
import { FormSigninComponent } from './form-signin/form-signin.component';
import { FavoriteDialogComponent } from './favorite-dialog/favorite-dialog.component';
import { AddrecipeComponent } from './addrecipe/addrecipe.component';
import { QuillConfigModule, QuillModule } from 'ngx-quill';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormSigninComponent,
    SignupComponent,
    LoginComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    FilterDialogComponent,
    DekstopFilterDialogComponent,
    ResepFavoritComponent,
    FavoriteDialogComponent,
    AddrecipeComponent,
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
