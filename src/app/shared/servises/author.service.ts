import { Author, Genre } from '../interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { fbResponse } from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(
    private http: HttpClient
  ) { }

  getAllAutors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${environment.fbUrl}/authors.json`)
      .pipe(map((response: { [key: string]: any }) => {

        if (!response) {
          return []
        } else {
          return Object
            .keys(response)
            .map(key => ({
              ...response[key],
              id: key
            }))
        }
      }))
  }

  getAuthorById(id: string): Observable<Author> {
    return this.http.get<Author>(`${environment.fbUrl}/authors/${id}.json`)
      .pipe(map((response: Author) => {
        return {
          ...response, id
        }
      }))
  }

  createAuthor(author: Author): Observable<Author> {
    return this.http.post(`${environment.fbUrl}/authors.json`, author)
      .pipe(map((response: fbResponse) => {
        return {
          ...author,
          id: response.name
        }
      }))
  }

  deleteAuthor(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbUrl}/authors/${id}.json`)
  }

  updateAuthor(author: Author): Observable<Author> {
    return this.http.patch<Author>(`${environment.fbUrl}/authors/${author.id}.json`, author)
  }


}
