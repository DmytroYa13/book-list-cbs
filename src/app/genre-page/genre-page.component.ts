import { Genre } from './../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators'
import { GenreService } from '../shared/servises/genre.service';


@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrls: ['./genre-page.component.css']
})
export class GenrePageComponent implements OnInit {

  genreForm: FormGroup
  genresList: Genre[]

  constructor(
    private genreService: GenreService
  ) { }

  ngOnInit(): void {
    this.genreForm = new FormGroup({
      name: new FormControl('', [Validators.required, CustomValidators.noSpaces])
    })

    this.genreService.getAllGenres().subscribe(
      genres => this.genresList = genres,
      error => console.log(error)

    )

  }

  onSumbit() {

    this.genreForm.disable()

    this.genreService.createGenre({ name: this.genreForm.value.name.trim() })
      .subscribe(
        genre => {
          this.genresList.unshift(genre)
          console.log(genre);

        },
        error => console.log(error),
        () => {
          this.genreForm.enable()
          this.genreForm.reset({ name: '' })
        }

      )


  }

  deleteGenre(genre: Genre) {

    const desicion = window.confirm(`Delete ${genre.name} ??`)

    if (!desicion) {
      return
    }
    this.genreService.deleteGenre(genre.id).subscribe(
      () => {
        this.genresList = this.genresList.filter(g => g.id !== genre.id)
      },
      error => console.log(error)
      
    )
  }

}
