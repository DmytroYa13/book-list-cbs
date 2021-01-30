import { Author } from './../shared/interfaces';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthorService } from '../shared/servises/author.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.css']
})
export class AuthorPageComponent implements OnInit, OnDestroy {

  author: Author
  aSub:Subscription

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.params.pipe(
      switchMap(
        (params: Params) => {
          return this.authorService.getAuthorById(params['id'])
        }
      )
    ).subscribe(author => this.author = author)
  }

  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }
}
