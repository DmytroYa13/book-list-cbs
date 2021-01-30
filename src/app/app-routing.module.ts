import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAuthorPageComponent } from './add-author-page/add-author-page.component';
import { AuthorPageComponent } from './author-page/author-page.component';
import { EditAuthorPageComponent } from './edit-author-page/edit-author-page.component';
import { GenrePageComponent } from './genre-page/genre-page.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {path:'', component: MainPageComponent},
  {path:'author/:id', component: AuthorPageComponent},
  {path:'genre', component: GenrePageComponent},
  {path:'add', component: AddAuthorPageComponent},
  {path:'edit/:id', component: AddAuthorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
