import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './header/header.component';
import { AddrecipeComponent } from './addrecipe/addrecipe.component';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { QuillConfigModule, QuillModule } from 'ngx-quill';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [AppComponent, HeaderComponent, AddrecipeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    QuillModule.forRoot(),
    NgxDropzoneModule,
    QuillConfigModule.forRoot({
      modules: {
        syntax: true,
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
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
