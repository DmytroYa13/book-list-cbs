import { Injectable } from '@angular/core';
import { Genre, fbResponse } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(
    private http: HttpClient
  ) { }

  createGenre(genre: Genre): Observable<Genre> {
    return this.http.post(`${environment.fbUrl}/genres.json`, genre)
      .pipe(map((response: fbResponse) => {
        return {
          ...genre,
          id: response.name
        }
      }))
  }

  getAllGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${environment.fbUrl}/genres.json`)
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

  deleteGenre(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbUrl}/genres/${id}.json`)
  }


}
