import { Author, Book, Genre } from './../shared/interfaces';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators'
import { AuthorService } from '../shared/servises/author.service'
import { of, Subscription } from 'rxjs';

import { v4 as uuidv4 } from 'uuid';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GenreService } from '../shared/servises/genre.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-author-page',
  templateUrl: './add-author-page.component.html',
  styleUrls: ['./add-author-page.component.css']
})
export class AddAuthorPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  addBookForm: FormGroup
  hSub: Subscription
  isAddBookVisible: boolean = false  
  booksList: Book[] = []
  genres: Genre[] = []
  isNew: boolean = true
  author: Author

  constructor(
    private authorService: AuthorService,
    private genreService: GenreService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, CustomValidators.noSpaces]),
      middleName: new FormControl(''),
      lastName: new FormControl('', [Validators.required, CustomValidators.noSpaces]),
      dateOfBirth: new FormControl('', [Validators.required])
    })


    this.form.disable()
    this.route.params.pipe(
      switchMap((params: Params) => {
        if (params['id']) {
          this.isNew = false
          return this.authorService.getAuthorById((params['id']))
        }
        return of(null)
      })
    ).subscribe(
      (author: Author) => {
        if (author) {
          this.author = author

          if (author.bookList) {
            this.booksList = author.bookList
          } else {
            this.booksList = []
          }

          this.form.patchValue({
            firstName: author.firstName,
            middleName: author.middleName,
            lastName: author.lastName,
            dateOfBirth: author.dateOfBirth
          })
        }
        this.form.enable()
      },
      error => console.log(error)
    )

    this.genreService.getAllGenres().subscribe(genres => this.genres = genres)

    this.addBookForm = new FormGroup({
      title: new FormControl('', [Validators.required, CustomValidators.noSpaces]),
      genre: new FormControl('', [Validators.required]),
      pages: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)])
    })
  }


  onSubmit() {

    if (this.form.invalid) {
      return
    }
    this.form.disable()

    const newAuthor: Author = {
      firstName: this.form.value.firstName.trim(),
      middleName: this.form.value.middleName.trim(),
      lastName: this.form.value.lastName.trim(),
      dateOfBirth: this.form.value.dateOfBirth,
      bookList: this.booksList,
    }

    let stream$
    if (this.isNew) {
      stream$ = this.authorService.createAuthor(newAuthor)
    } else {
      stream$ = this.authorService.updateAuthor({ ...newAuthor, id: this.author.id })
    }

    stream$.subscribe(
      author => console.log(author),
      error => console.log(error),
      () => {
        this.form.enable()
        this.form.reset({
          firstName: '',
          middleName: '',
          lastName: '',
          dateOfBirth: '',
        })
        this.router.navigate(["/"])
      }
    )
  }

  OnAddSubmit() {
    if (this.addBookForm.invalid) {
      return
    }
    const newBook: Book = {
      title: this.addBookForm.value.title.trim(),
      genre: this.addBookForm.value.genre,
      pages: this.addBookForm.value.pages.trim(),
      id: uuidv4()
    }

    this.booksList.unshift(newBook)
    this.isAddBookVisible = false
    this.addBookForm.reset({
      title: '',
      genre: '',
      pages: '',
    })

  }


  ngOnDestroy() {
    // if(this.hSub){
    //   this.hSub.unsubscribe()
    // }
  }

}
