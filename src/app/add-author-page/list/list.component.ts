import { Author, Book, Genre } from './../../shared/interfaces';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../shared/custom.validators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit {

  @Input('books') booksList: Book[];
  @Input('genres') genresList: Genre[];
  @Input('isNew') isNew: boolean
  @ViewChild('bookCard') bookCard: TemplateRef<any>;
  @ViewChild('bookEdit') bookEdit: TemplateRef<any>;

  selectedForm: FormGroup
  post: Author
  selectedBook: Book = null
  postBooks: Book[] = []
  newBoobForm: FormGroup

  constructor(private cdr: ChangeDetectorRef)
   { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  getTemplate(book) {
    return this.selectedBook && this.selectedBook.id == book.id
      ? this.bookEdit : this.bookCard  
  }


  edit(book: Book) {
    this.selectedBook = Object.assign({}, book)
    this.selectedBookForm()
  }

  selectedBookForm() {
    this.selectedForm = new FormGroup({
      selectedTitle: new FormControl(this.selectedBook.title, [Validators.required, CustomValidators.noSpaces]),  
      selectedGenre: new FormControl(this.selectedBook.genre, [Validators.required]),
      selectedPages: new FormControl(this.selectedBook.pages, [Validators.required, Validators.pattern(/^\d+$/)]),
    })
  }
  deleteBook(book: Book) {

    const desicion = window.confirm(`Delete "${book.title}" ??`)
    if(!desicion) return
    let val = this.booksList
    let index: number = val.findIndex(x => x.id == book.id)
    val.splice(index, 1)
    this.reset()
  }
  reset() {
    this.selectedBook = null
  }

  save(){
    let val = this.booksList
    let index: number = val.findIndex(x => x.id == this.selectedBook.id)
    
    const bookAfterChange: Book = {
      title: this.selectedForm.value.selectedTitle,
      genre: this.selectedForm.value.selectedGenre,
      pages: this.selectedForm.value.selectedPages,
    }
    Object.assign(val[index], bookAfterChange)
    this.reset()
  }
}
