import { Book, SearchBook } from './../shared/interfaces';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { from, fromEvent, Subscription } from 'rxjs';
import { AuthorService } from '../shared/servises/author.service';
import { Author } from '../shared/interfaces'
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('searchInput') searchInputRef: ElementRef

  authors: Author[]
  booksForSerch: SearchBook[] = []
  booksForResult: SearchBook[] = []
  searchTitle: string
  isResult: boolean = true
  aSub: Subscription
  dSub: Subscription


  constructor(
    private authorService: AuthorService

  ) { }

  ngOnInit(): void {
    this.aSub = this.authorService.getAllAutors().subscribe(
      authors => {
        this.authors = authors
        this.authors.forEach((b) => {

          if (b.bookList) {
            b.bookList.forEach((p) => {
              this.booksForSerch.push({ title: p.title, authorId: b.id })
            })
          }
        })
      }
    )
  }

  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe()
    }
    if(this.dSub){
      this.dSub.unsubscribe()
    }
  }

  closeListForResult(){
    setTimeout(() =>{
      this.booksForResult = []
      this.searchInputRef.nativeElement.value = null
      this.isResult = true
    },200)
    
  }

  ngAfterViewInit() {
    const search$ = fromEvent<any>(this.searchInputRef.nativeElement, 'input')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map(v => v.target.value),
        tap(v => {
          if (!v) {
            this.isResult = true
            this.booksForResult = []
          }
        }),
        filter(v => v.length),
        tap(v => {
          this.searchTitle = v
          this.isResult = false
          this.booksForResult = []
        }),
        switchMap(() => from(this.booksForSerch)),
        filter(book => {
          let result = book.title.toLowerCase().includes(this.searchTitle.toLocaleLowerCase())

          if (result) {
            this.isResult = true
            return true
          } else {
            return false
          }
        }
        )
      ).subscribe(
        result => {
        this.booksForResult.push(result)}
      )
  }



  deleteAuthor(author: Author) {

    const desicion = window.confirm(`Delete ${author.lastName} ??`)
    if (!desicion) return
    this.dSub = this.authorService.deleteAuthor(author.id).subscribe(
      () => this.authors = this.authors.filter(post => post.id !== author.id)
    )
  }

}
