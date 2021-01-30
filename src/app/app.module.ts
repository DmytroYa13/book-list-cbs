import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { GenrePageComponent } from './genre-page/genre-page.component';
import { AuthorPageComponent } from './author-page/author-page.component';
import { AddAuthorPageComponent } from './add-author-page/add-author-page.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FirstLetterNamePipe } from './shared/first-letter-name.pipe';
import { ListComponent } from './add-author-page/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    GenrePageComponent,
    AuthorPageComponent,
    AddAuthorPageComponent,
    LoaderComponent,
    FirstLetterNamePipe,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
